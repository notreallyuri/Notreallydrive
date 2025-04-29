export type File = {
  id: string;
  name: string;
  type: "file";
  url: string;
  parent: string;
  size: string;
};

export type Folder = {
  id: string;
  name: string;
  type: "folder";
  parent: string | null;
};

export const mockFolders: Folder[] = [
  { id: "root", name: "root", type: "folder", parent: null },
  { id: "1", name: "Documents", type: "folder", parent: "root" },
  { id: "2", name: "Images", type: "folder", parent: "root" },
  { id: "3", name: "Work", type: "folder", parent: "root" },
  { id: "4", name: "Projects", type: "folder", parent: "3" },
  { id: "5", name: "Personal", type: "folder", parent: "root" },
  { id: "6", name: "Reports", type: "folder", parent: "1" },
  { id: "7", name: "Vacation Photos", type: "folder", parent: "2" },
  { id: "8", name: "Presentations", type: "folder", parent: "3" },
  { id: "9", name: "Archived", type: "folder", parent: "root" },
  { id: "10", name: "Templates", type: "folder", parent: "1" },
  { id: "11", name: "Code Samples", type: "folder", parent: "4" },
  { id: "12", name: "Receipts", type: "folder", parent: "5" },
];

export const mockFiles: File[] = [
  {
    id: "f1",
    name: "Project Proposal.docx",
    type: "file",
    url: "https://example.com/project-proposal.docx",
    parent: "1",
    size: "2.3MB",
  },
  {
    id: "f2",
    name: "Budget 2025.xlsx",
    type: "file",
    url: "https://example.com/budget-2025.xlsx",
    parent: "1",
    size: "1.7MB",
  },
  {
    id: "f3",
    name: "Team Photo.jpg",
    type: "file",
    url: "https://example.com/team-photo.jpg",
    parent: "2",
    size: "4.5MB",
  },
  {
    id: "f4",
    name: "Product Mockup.png",
    type: "file",
    url: "https://example.com/product-mockup.png",
    parent: "2",
    size: "3.2MB",
  },
  {
    id: "f5",
    name: "Meeting Notes.pdf",
    type: "file",
    url: "https://example.com/meeting-notes.pdf",
    parent: "3",
    size: "872KB",
  },
  {
    id: "f6",
    name: "Project Timeline.xlsx",
    type: "file",
    url: "https://example.com/project-timeline.xlsx",
    parent: "4",
    size: "1.1MB",
  },
  {
    id: "f7",
    name: "Client Feedback.docx",
    type: "file",
    url: "https://example.com/client-feedback.docx",
    parent: "4",
    size: "567KB",
  },
  {
    id: "f8",
    name: "Vacation Itinerary.pdf",
    type: "file",
    url: "https://example.com/vacation-itinerary.pdf",
    parent: "5",
    size: "1.3MB",
  },
  {
    id: "f9",
    name: "Tax Return 2024.pdf",
    type: "file",
    url: "https://example.com/tax-return-2024.pdf",
    parent: "5",
    size: "3.8MB",
  },
  {
    id: "f10",
    name: "Quarterly Report Q1.pdf",
    type: "file",
    url: "https://example.com/quarterly-report-q1.pdf",
    parent: "6",
    size: "5.2MB",
  },
  {
    id: "f11",
    name: "Quarterly Report Q2.pdf",
    type: "file",
    url: "https://example.com/quarterly-report-q2.pdf",
    parent: "6",
    size: "4.9MB",
  },
  {
    id: "f12",
    name: "Beach Sunset.jpeg",
    type: "file",
    url: "https://example.com/beach-sunset.jpeg",
    parent: "7",
    size: "6.7MB",
  },
  {
    id: "f13",
    name: "Mountain Hike.heic",
    type: "file",
    url: "https://example.com/mountain-hike.heic",
    parent: "7",
    size: "9.3MB",
  },
  {
    id: "f14",
    name: "Company Overview.pptx",
    type: "file",
    url: "https://example.com/company-overview.pptx",
    parent: "8",
    size: "7.8MB",
  },
  {
    id: "f15",
    name: "Product Launch.pptx",
    type: "file",
    url: "https://example.com/product-launch.pptx",
    parent: "8",
    size: "12.5MB",
  },
  {
    id: "f16",
    name: "Old Contract.pdf",
    type: "file",
    url: "https://example.com/old-contract.pdf",
    parent: "9",
    size: "1.9MB",
  },
  {
    id: "f17",
    name: "Archived Photos.zip",
    type: "file",
    url: "https://example.com/archived-photos.zip",
    parent: "9",
    size: "156MB",
  },
  {
    id: "f18",
    name: "Invoice Template.docx",
    type: "file",
    url: "https://example.com/invoice-template.docx",
    parent: "10",
    size: "523KB",
  },
  {
    id: "f19",
    name: "Resume Template.docx",
    type: "file",
    url: "https://example.com/resume-template.docx",
    parent: "10",
    size: "435KB",
  },
  {
    id: "f20",
    name: "React Component.tsx",
    type: "file",
    url: "https://example.com/react-component.tsx",
    parent: "11",
    size: "16KB",
  },
  {
    id: "f21",
    name: "API Documentation.md",
    type: "file",
    url: "https://example.com/api-documentation.md",
    parent: "11",
    size: "89KB",
  },
  {
    id: "f22",
    name: "Hotel Receipt.pdf",
    type: "file",
    url: "https://example.com/hotel-receipt.pdf",
    parent: "12",
    size: "1.1MB",
  },
  {
    id: "f23",
    name: "Flight Ticket.pdf",
    type: "file",
    url: "https://example.com/flight-ticket.pdf",
    parent: "12",
    size: "876KB",
  },
  {
    id: "f24",
    name: "README.md",
    type: "file",
    url: "https://example.com/readme.md",
    parent: "root",
    size: "8KB",
  },
  {
    id: "f25",
    name: "Getting Started.pdf",
    type: "file",
    url: "https://example.com/getting-started.pdf",
    parent: "root",
    size: "1.2MB",
  },
];
