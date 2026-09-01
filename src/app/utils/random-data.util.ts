import { IdCardValues } from '../models/id-card.model';

const FIRST_NAMES = [
  'Amara', 'Liam', 'Sofia', 'Noah', 'Chidi', 'Grace', 'Kwame', 'Olivia',
  'Daniel', 'Ngozi', 'Ethan', 'Mia', 'Tunde', 'Ava', 'Femi', 'Zainab',
];
const LAST_NAMES = [
  'Johnson', 'Okafor', 'Martinez', 'Chen', 'Adeyemi', 'Garcia', 'Bello',
  'Smith', 'Nwosu', 'Rossi', 'Williams', 'Eze',
];
const SCHOOLS = [
  'Springfield High', 'Federal University of Benin', 'Riverside Academy',
  "St. Mary's College", 'Northgate Secondary School', 'University of Lagos',
];
const GRADES = [
  '9th Grade', '10th Grade', '11th Grade', '12th Grade',
  '100 Level', '200 Level', '300 Level', '400 Level',
];
const DEPARTMENTS = [
  'Pharmacy', 'Computer Science', 'Mechanical Engineering',
  'Business Administration', 'Nursing',
];
const ADDRESSES = [
  '123 School St, City', '45 Campus Road, Metro City',
  '8 University Avenue, Uptown', '200 Learning Lane, Eastside',
];
const SAMPLE_PHOTOS = [
  'assets/serious-young-african-man-standing-isolated.jpg',
  'assets/closeup-young-female-professional-making-eye-contact-against-colored-background.jpg',
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomIdCardValues(): IdCardValues {
  const year = 2024 + Math.floor(Math.random() * 3);
  return {
    schoolLogo: 'assets/school-logo.jpg',
    studentName: `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`,
    schoolName: pick(SCHOOLS),
    studentYear: String(year),
    studentId: String(100000 + Math.floor(Math.random() * 899999)),
    grade: pick(GRADES),
    department: pick(DEPARTMENTS),
    schoolAddress: pick(ADDRESSES),
    studentPhoto: pick(SAMPLE_PHOTOS),
    signature: 'assets/signature.png',
    schoolWaterMark: 'assets/schoolwatermark.jpg',
    bgColor: '#ffffff',
    returnMessage: 'If found, return to school authorities.',
  };
}
