# Data model

A complete Prisma schema for phase 1 and 2, with phase 3 stubs marked. It is derived from the fields that
actually appear in the console screens — every model below is something an editor touches.

Two content shapes, and the distinction matters:

- **`Page`** — an ordered list of typed `PageSection`s, each with a JSON payload. This is what makes the
  page editor work. Do not model each page as fixed columns; the Home page alone has nine sections and
  editors reorder and hide them.
- **Collections** (`Service`, `Project`, `Insight`, `Role`, `Sector`) — normal typed records, each rendered
  through one template. These have real columns, because their shape is fixed.

Both carry the same publish envelope: `status`, `draftData`, `publishedData`, `publishedAt`, version history,
audit trail.

```prisma
// ─────────────────────────────────────────────────────────── enums

enum ContentStatus {
  DRAFT
  PUBLISHED
  SCHEDULED
  ARCHIVED
}

enum UserRole {
  DIRECTOR    // full access, TOTP required
  MARKETING   // edit + publish content
  ENGINEER    // edit as draft only, no publish
  RECRUITER   // careers + applications only
}

enum CapabilityGroup {
  AI_AUTONOMY
  DATA_CLOUD
  PRODUCT_ENGINEERING
  TEAMS_ADVISORY
}

enum MetricRole {
  INTERACTION   // blue — a neutral fact
  PROOF         // green — a measured outcome
}

enum EnquiryStatus {
  NEW
  AWAITING_REPLY
  CALL_BOOKED
  PROPOSAL_OUT
  WON
  CLOSED_NO_FIT
}

enum ApplicationStage {
  NEW
  SCREENING
  ENGINEER_CALL
  TECHNICAL_SESSION
  OFFER
  HIRED
  REJECTED
  WITHDRAWN
}

enum ClientType {
  STARTUP
  SMB
  ENTERPRISE
  PUBLIC_SECTOR
  OTHER
}

// ─────────────────────────────────────────────────────────── pages

model Page {
  id              String        @id @default(cuid())
  slug            String        @unique          // "" for home, "about", "careers/apply"
  title           String
  status          ContentStatus @default(DRAFT)
  template        String        @default("standard")
  navLabel        String?                        // which menu it belongs to, if any
  isSystem        Boolean       @default(false)  // legal pages etc — cannot be deleted
  sections        PageSection[]
  seo             Seo?
  publishedAt     DateTime?
  scheduledFor    DateTime?
  versions        ContentVersion[]
  updatedAt       DateTime      @updatedAt
  updatedById     String?
  updatedBy       User?         @relation(fields: [updatedById], references: [id])
}

model PageSection {
  id          String   @id @default(cuid())
  pageId      String
  page        Page     @relation(fields: [pageId], references: [id], onDelete: Cascade)
  type        String   // see the section-type registry below
  order       Int
  visible     Boolean  @default(true)
  locked      Boolean  @default(false)  // header/footer — edited in Navigation & footer
  anchorId    String?                   // for jump-bar targets
  draftData   Json                      // what the editor is working on
  publishedData Json?                   // what the site serves
  updatedAt   DateTime @updatedAt

  @@unique([pageId, order])
}
```

### Section-type registry

Each `type` has a Zod schema and a React renderer. This list comes from the sections actually present in
the 15 page designs — implement these and no more.

| `type` | Payload | Used on |
|---|---|---|
| `hero` | eyebrow, heading, intro, layout, backdropMediaId, stats[{value,label,role}], buttons[{label,target}] | every page |
| `jumpBar` | links[{label, anchorId}] | Services, Industries, About, Careers, Work, Service detail |
| `cardGrid` | eyebrow, heading, intro, cards[{kicker,title,body,chips[]}] | Home, Services, About, Industries, Careers, Work |
| `numberedList` | eyebrow, heading, intro, items[{number,title,body}] | About (principles), Contact (next steps), Careers (hiring) |
| `metricBand` | eyebrow, heading, metrics[{value,label,note,role}] | Home, Service detail |
| `logoCarousel` | heading, mediaIds[] , mono(bool) | Home |
| `serviceList` | groupIds[] or auto | Services |
| `projectGrid` | source (auto/manual), limit, projectIds[] | Home, Work |
| `insightGrid` | source, limit, layout (cards/list) | Home, Insights |
| `sectorRows` | sectorIds[] or auto | Industries |
| `peopleGrid` | eyebrow, heading, intro, people[{name,role,mediaId}], note | About |
| `timeline` | eyebrow, heading, intro, entries[{year,title,body}] | About |
| `roleList` | source, roleIds[] | Careers |
| `richText` | heading, body (TipTap JSON) | Privacy, Terms, Cookies |
| `tocSidebar` | auto from richText headings | legal pages, article |
| `dataTable` | caption, columns[], rows[][] | Cookies |
| `contactForm` | heading, intro, fields config, consentText | Contact |
| `applicationForm` | heading, intro, roleOptions source, consentText | Apply |
| `newsletterSignup` | heading, intro, buttonLabel | Insights |
| `faq` | eyebrow, heading, items[{q,a}] | Service detail |
| `pilotTimeline` | eyebrow, heading, weeks[{label,title,body}] | Service detail |
| `ctaBanner` | heading, intro, buttons[{label,target}] | every page |
| `noteBox` | title, body, tone | legal pages, Work |

```prisma
// ─────────────────────────────────────────────────── collections

model ServiceGroup {
  id        String          @id @default(cuid())
  key       CapabilityGroup @unique
  name      String
  intro     String?
  order     Int
  services  Service[]
}

model Service {
  id            String        @id @default(cuid())
  slug          String        @unique
  name          String
  summary       String                          // one line, used in nav + list
  intro         String        @db.Text
  groupId       String
  group         ServiceGroup  @relation(fields: [groupId], references: [id])
  order         Int
  primarySector String?
  sections      Json                            // which detail-page sections are enabled
  detailData    Json                            // per-section payloads for the detail template
  showInNav     Boolean       @default(true)
  showInFooter  Boolean       @default(true)
  status        ContentStatus @default(DRAFT)
  seo           Seo?
  projects      Project[]
  publishedAt   DateTime?
  versions      ContentVersion[]
  updatedAt     DateTime      @updatedAt

  @@unique([groupId, order])
}

model Project {
  id              String          @id @default(cuid())
  slug            String          @unique
  name            String
  description     String          @db.Text      // two sentences max — it is a card
  capabilityTag   String                        // "Agentic AI", "Web & mobile", …
  sector          String                        // REQUIRED to publish
  region          String                        // REQUIRED to publish
  stack           String[]                      // rendered as chips, 3–4
  coverMediaId    String?
  coverAlt        String?
  serviceId       String?
  service         Service?        @relation(fields: [serviceId], references: [id])
  metrics         Metric[]                      // at least one REQUIRED to publish
  stillSupported  Boolean         @default(true)
  showOnHome      Boolean         @default(false)
  sectorId        String?                       // to surface on the Industries page
  sectorRef       Sector?         @relation(fields: [sectorId], references: [id])
  order           Int
  status          ContentStatus   @default(DRAFT)
  seo             Seo?
  publishedAt     DateTime?
  versions        ContentVersion[]
  updatedAt       DateTime        @updatedAt
}

model Metric {
  id            String     @id @default(cuid())
  value         String                          // "68%", "3.2×", "2,400", "24/7"
  label         String                          // "faster first response"
  method        String     @db.Text             // PRIVATE — never rendered publicly
  clientApproved Boolean   @default(false)      // must be true to publish
  caveat        String?    @db.Text             // published alongside if present
  role          MetricRole @default(PROOF)
  order         Int
  projectId     String?
  project       Project?   @relation(fields: [projectId], references: [id], onDelete: Cascade)
  sectorId      String?
  sector        Sector?    @relation(fields: [sectorId], references: [id], onDelete: Cascade)
}

model Sector {
  id           String          @id @default(cuid())
  slug         String          @unique
  name         String                           // "Insurance"
  regions      String[]                         // ["EU"], ["APAC","EU"]
  body         String          @db.Text
  chips        String[]
  metrics      Metric[]
  projects     Project[]
  order        Int
  status       ContentStatus   @default(DRAFT)
  updatedAt    DateTime        @updatedAt
}

model Insight {
  id            String        @id @default(cuid())
  slug          String        @unique
  title         String
  standfirst    String        @db.Text
  body          Json                            // TipTap document
  categoryId    String
  category      InsightCategory @relation(fields: [categoryId], references: [id])
  authorId      String
  author        Author        @relation(fields: [authorId], references: [id])
  coverMediaId  String?
  coverAlt      String?
  readMinutes   Int?                            // derived from body on save
  featured      Boolean       @default(false)
  inNextDigest  Boolean       @default(true)
  noIndex       Boolean       @default(false)
  relatedServiceId String?
  relatedProjectId String?
  keepReadingMode  String     @default("auto")  // auto | manual
  keepReadingIds   String[]
  reviewedNoClientNames Boolean @default(false) // publish gate
  reviewedFigures       Boolean @default(false) // publish gate
  reviewedSecondReader  Boolean @default(false) // habit, not enforced
  status        ContentStatus @default(DRAFT)
  seo           Seo?
  publishedAt   DateTime?
  readCount     Int           @default(0)
  versions      ContentVersion[]
  updatedAt     DateTime      @updatedAt
}

model InsightCategory {
  id       String    @id @default(cuid())
  slug     String    @unique
  name     String                              // AI engineering, Data & cloud, Product, Working with us
  order    Int
  insights Insight[]
}

model Author {
  id        String    @id @default(cuid())
  name      String
  role      String
  bio       String?   @db.Text
  mediaId   String?
  userId    String?   @unique
  user      User?     @relation(fields: [userId], references: [id])
  insights  Insight[]
}

model Role {                                    // job openings
  id            String        @id @default(cuid())
  slug          String        @unique
  title         String
  team          String
  location      String        @default("Islamabad")
  employmentType String       @default("Full-time")
  experience    String?                         // "3+ years"
  reportsTo     String?
  summary       String        @db.Text
  body          Json                            // TipTap: work, requirements, offer
  chips         String[]                        // Python, RAG, LangGraph
  order         Int
  status        ContentStatus @default(DRAFT)
  seo           Seo?
  publishedAt   DateTime?
  applications  Application[]
  versions      ContentVersion[]
  updatedAt     DateTime      @updatedAt
}

// ───────────────────────────────────────────── global content

model Navigation {
  id        String       @id @default("singleton")
  items     NavItem[]
  buttonLabel String     @default("Start a project")
  buttonTargetPageId String?
  buttonStyle String      @default("primary")
  mobileSource String     @default("same")      // same | custom
  mobileShowButton String @default("pinned")
  mobileShowContact Boolean @default(true)
  headerLogoMediaId String?                     // white knockout SVG
  footerLogoMediaId String?                     // full colour SVG
  faviconMediaId    String?
  draftData Json?
  publishedData Json?
  publishedAt DateTime?
  updatedAt DateTime     @updatedAt
}

model NavItem {
  id           String      @id @default(cuid())
  navigationId String
  navigation   Navigation  @relation(fields: [navigationId], references: [id])
  label        String
  kind         String      // link | dropdown
  targetPageId String?
  externalUrl  String?
  order        Int
  parentId     String?
  parent       NavItem?    @relation("NavChildren", fields: [parentId], references: [id])
  children     NavItem[]   @relation("NavChildren")
}

model Footer {
  id        String        @id @default("singleton")
  brandName String        @default("bX Technologies Pvt Ltd")
  blurb     String        @db.Text
  columns   FooterColumn[]
  copyright String                              // year substituted at render
  registrations String    @db.Text
  legalLinks Json                               // [{label, pageId}]
  draftData Json?
  publishedData Json?
  publishedAt DateTime?
  updatedAt DateTime      @updatedAt
}

model FooterColumn {
  id       String  @id @default(cuid())
  footerId String
  footer   Footer  @relation(fields: [footerId], references: [id])
  heading  String
  order    Int
  source   String  @default("manual")           // manual | services | settings-contact | social
  links    Json                                 // [{label, pageId|url}]
}

model SiteSettings {
  id            String  @id @default("singleton")
  companyName   String  @default("bX Technologies Pvt Ltd")
  email         String  @default("info@bxtechnologies.net")
  careersEmail  String  @default("jobs@bxtechnologies.net")
  phone         String  @default("+49 203 34689340")
  offices       Json                            // [{city,country,kind,body,chips[]}]
  registrations Json                            // [{label}]
  social        Json                            // [{network,url}]
  incorporated  String  @default("March 2019")
  seoDefaults   Json                            // title template, description, og image
  analyticsEnabled Boolean @default(true)
  blockedNames  String[]                        // client names refused on publish
  enquiryRouting Json                           // budget/type → owner rules
  updatedAt     DateTime @updatedAt
}

// ───────────────────────────────────────────────────── media

model Media {
  id           String   @id @default(cuid())
  filename     String
  storageKey   String   @unique
  mimeType     String
  bytes        Int
  width        Int?
  height       Int?
  alt          String?                          // required before use on a published page
  caption      String?
  folder       String   @default("uncategorised")
  uploadedById String?
  uploadedBy   User?    @relation(fields: [uploadedById], references: [id])
  usages       MediaUsage[]
  createdAt    DateTime @default(now())
}

model MediaUsage {                              // powers "Used on" and blocks deletion
  id         String @id @default(cuid())
  mediaId    String
  media      Media  @relation(fields: [mediaId], references: [id], onDelete: Cascade)
  entityType String                             // page | service | project | insight | role | settings
  entityId   String
  field      String                             // "hero.backdrop", "cover"

  @@unique([mediaId, entityType, entityId, field])
}

// ─────────────────────────────────────────────────── inbound

model Enquiry {
  id            String        @id @default(cuid())
  name          String
  company       String?
  email         String
  phone         String?
  need          String                          // new build | AI pilot | data/cloud | team | unsure
  clientType    ClientType
  budgetBand    String
  message       String        @db.Text
  source        String?                         // referral, organic, LinkedIn, partner, article
  status        EnquiryStatus @default(NEW)
  ownerId       String?
  owner         User?         @relation(fields: [ownerId], references: [id])
  firstRepliedAt DateTime?                      // drives the median-first-reply KPI
  notes         InternalNote[]
  activity      ActivityEvent[]
  createdAt     DateTime      @default(now())
  deleteAfter   DateTime                        // createdAt + 24 months
}

model Application {
  id             String           @id @default(cuid())
  roleId         String?
  role           Role?            @relation(fields: [roleId], references: [id])
  speculative    Boolean          @default(false)
  name           String
  email          String
  phone          String?
  location       String?
  linkedinUrl    String?
  portfolioUrl   String?
  experienceBand String
  earliestStart  String
  cvMediaId      String?
  proudOf        String           @db.Text
  ambition       String           @db.Text
  heardVia       String?
  consentGiven   Boolean          @default(false)
  stage          ApplicationStage @default(NEW)
  ownerId        String?
  owner          User?            @relation(fields: [ownerId], references: [id])
  notes          InternalNote[]
  activity       ActivityEvent[]
  createdAt      DateTime         @default(now())
  deleteAfter    DateTime                       // createdAt + 12 months
}

model Subscriber {
  id           String    @id @default(cuid())
  email        String    @unique
  confirmedAt  DateTime?
  unsubscribedAt DateTime?
  createdAt    DateTime  @default(now())
}

model InternalNote {
  id            String       @id @default(cuid())
  body          String       @db.Text
  authorId      String
  author        User         @relation(fields: [authorId], references: [id])
  enquiryId     String?
  enquiry       Enquiry?     @relation(fields: [enquiryId], references: [id], onDelete: Cascade)
  applicationId String?
  application   Application? @relation(fields: [applicationId], references: [id], onDelete: Cascade)
  createdAt     DateTime     @default(now())
}

model ActivityEvent {
  id            String       @id @default(cuid())
  kind          String                          // received | acknowledged | assigned | stage_changed | matched
  summary       String
  actorId       String?
  actor         User?        @relation(fields: [actorId], references: [id])
  enquiryId     String?
  enquiry       Enquiry?     @relation(fields: [enquiryId], references: [id], onDelete: Cascade)
  applicationId String?
  application   Application? @relation(fields: [applicationId], references: [id], onDelete: Cascade)
  createdAt     DateTime     @default(now())
}

// ─────────────────────────────────────── users, versions, audit

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  passwordHash  String
  role          UserRole
  totpSecret    String?                         // required when role = DIRECTOR
  totpEnabled   Boolean   @default(false)
  sidebarCollapsed Boolean @default(false)
  lastSeenAt    DateTime?
  invitedById   String?
  active        Boolean   @default(true)
  sessions      Session[]
  createdAt     DateTime  @default(now())
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  tokenHash String   @unique
  userAgent String?
  ip        String?
  expiresAt DateTime
  createdAt DateTime @default(now())
}

model ContentVersion {
  id         String   @id @default(cuid())
  entityType String                             // page | service | project | insight | role | nav | footer
  entityId   String
  snapshot   Json                               // full published payload at that moment
  label      String?                            // "Published", "Hero paragraph edited"
  authorId   String?
  author     User?    @relation(fields: [authorId], references: [id])
  createdAt  DateTime @default(now())

  pageId    String?
  page      Page?    @relation(fields: [pageId], references: [id], onDelete: Cascade)
  serviceId String?
  service   Service? @relation(fields: [serviceId], references: [id], onDelete: Cascade)
  projectId String?
  project   Project? @relation(fields: [projectId], references: [id], onDelete: Cascade)
  insightId String?
  insight   Insight? @relation(fields: [insightId], references: [id], onDelete: Cascade)
  roleId    String?
  roleRef   Role?    @relation(fields: [roleId], references: [id], onDelete: Cascade)

  @@index([entityType, entityId])
}

model AuditLog {
  id         String   @id @default(cuid())
  actorId    String?
  actor      User?    @relation(fields: [actorId], references: [id])
  action     String                             // created | updated | published | unpublished | deleted | login
  entityType String
  entityId   String
  diff       Json?
  ip         String?
  createdAt  DateTime @default(now())

  @@index([entityType, entityId])
  @@index([createdAt])
}

model Seo {
  id          String   @id @default(cuid())
  metaTitle   String?
  metaDescription String? @db.Text
  ogMediaId   String?
  noIndex     Boolean  @default(false)
  pageId      String?  @unique
  page        Page?    @relation(fields: [pageId], references: [id], onDelete: Cascade)
  serviceId   String?  @unique
  service     Service? @relation(fields: [serviceId], references: [id], onDelete: Cascade)
  projectId   String?  @unique
  project     Project? @relation(fields: [projectId], references: [id], onDelete: Cascade)
  insightId   String?  @unique
  insight     Insight? @relation(fields: [insightId], references: [id], onDelete: Cascade)
  roleId      String?  @unique
  roleRef     Role?    @relation(fields: [roleId], references: [id], onDelete: Cascade)
}

// ─────────────────────────────────── phase 3 — stubs only
// Proposal, DeliveryProject, Person, Allocation, Timesheet.
// The console sidebar links to these; no screens are designed. Do not invent them.
```

## Notes on implementation

**Draft vs published.** Two workable approaches: (a) `draftData` / `publishedData` JSON columns on the row,
as sketched above, or (b) a row per version with a `publishedVersionId` pointer. (a) is simpler and enough
here. Whichever you pick, the site must read only published data, and preview must read only draft.

**Derived fields.** `readMinutes` on `Insight` and any word count come from the TipTap document on save,
never from the client.

**Retention.** `deleteAfter` on `Enquiry` and `Application` exists so a nightly job can enforce the published
retention promises. Write that job in phase 2 — the promise is already on the public site.

**Seeding.** Seed from the prototypes: they contain the real structure and the placeholder copy. That gives a
working site on first run and makes the console immediately testable. Mark every seeded metric so they can be
found and replaced in one pass when real figures arrive.
