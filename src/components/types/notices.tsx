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

export const ISSUESCATEGORIES = [
    { id: "1", label: "Internal Marks Issue" },
    { id: "2", label: "Attendance Shortage Dispute" },
    { id: "3", label: "Exam Timetable Conflict" },
    { id: "4", label: "Result Correction Request" },
    { id: "5", label: "Faculty Behavior Complaint" },
    { id: "6", label: "Project Evaluation Issue" },
    { id: "7", label: "Ragging Complaint" },
    { id: "8", label: "Verbal Harassment" },
    { id: "9", label: "Physical Harassment" },
    { id: "10", label: "Cyber Bullying" },
    { id: "11", label: "Sexual Harassment" },
    { id: "12", label: "Gender Discrimination" },
    { id: "13", label: "Classroom Maintenance" },
    { id: "14", label: "Washroom Cleanliness" },
    { id: "15", label: "Drinking Water Problem" },
    { id: "16", label: "Electrical Issue" },
    { id: "17", label: "Hostel Room Allocation" },
    { id: "18", label: "Hostel Food Quality" },
    { id: "19", label: "Hostel WiFi Problem" },
    { id: "20", label: "Library Resources" },
    { id: "22", label: "Bus/Transport Issue" },
    { id: "24", label: "Certificate Delay" },
    { id: "25", label: "Scholarship Issue" },
    { id: "27", label: "Portal/IT Login Issue" },
    { id: "30", label: "Campus Security Concern" },
    { id: "99", label: "Other" },
];