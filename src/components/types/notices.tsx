export interface Notice {
    id: string;
    title: string;
    categoryId: string;
    deptId: string;
    content: string;
    imageUrl?: string;
    pdfUrl?: string;
}

export const CATEGORIES = [
    { id: "0", label: "All" },
    { id: "1", label: "Academic" },
    { id: "2", label: "Event" },
    { id: "3", label: "Emergency" },
    { id: "4", label: "Placement" },
    { id: "5", label: "Examination" },
    { id: "6", label: "Scholarship" },
    { id: "7", label: "Sports" },
    { id: "8", label: "Hostel" },
    { id: "9", label: "Library" },
    { id: "10", label: "Competition" }
];
export const DEPARTMENTS = [
    { id: "1", label: "Computer Science & Engineering" },
    { id: "2", label: "Information Technology" },
    { id: "3", label: "Electronics & Communication" },
    { id: "4", label: "Electrical & Electronics" },
    { id: "5", label: "Mechanical Engineering" },
    { id: "6", label: "Civil Engineering" },
    { id: "7", label: "Artificial Intelligence" },
    { id: "8", label: "MBA" },
    { id: "9", label: "BBA" },
    { id: "10", label: "B.Com" },
    { id: "99", label: "Other" }
];
