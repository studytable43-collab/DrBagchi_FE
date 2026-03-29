import { Component } from '@angular/core';
import { MyCoursesService } from '../my-courses.service';
import { CoursesService } from '../courses.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-courses',
  standalone: false,
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent { 
  classannouncement:any = []; 
  Liveclasshistroy:any = [];
constructor(private mycourses:MyCoursesService,private router:Router,private Courses:CoursesService) 
{
 
this.  GetMyCourses( );
this. GetOngoingClass(); 
console.log("DI Debug →", {
     mycourses,
    Courses,
    router
  });

 }

  // IST Timezone example
  now = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));

  // Example: announcements, live class status, quizzes
  announcements = [
    {
      message: 'New Java mock test scheduled at 7:30 PM IST. Attempt now!',
      type: 'quiz',
      link: '/quiz/789',
      cta: 'Join Quiz',
      icon: '📝'
    },
    {
      message: 'Mathematics Advanced live class started for Morning Batch.',
      type: 'live',
      link: '/live/room/456',
      cta: 'Join Live',
      icon: '🔴'
    }
  ];

  enrolledCourses = [
    {
      id: 1,
      title: 'Java Backend Development - Live',
      batch: 'Morning Batch',
      image: 'https://localhost:7091/media/CourseImages/92228219-e988-49fd-b347-697eee936266.png',
      percent: 15,
      status: 'Ongoing',
      currentTopic: 'OOP Devices and RAM',
      startDate: '2025-06-11T09:00:00+05:30',
      endDate: '2025-09-30T10:00:00+05:30',
      live: {
        isLive: true,
        title: 'Inheritance and Polymorphism',
        joinUrl: 'https://zoom.us/123456',
        time: '2025-10-21T20:00:00+05:30', // IST
        batch: 'Morning Batch'
      },
      quizzing: {
        isQuizLive: true,
        title: 'Mock Test #2',
        link: '/quiz/857'
      }
    },
    {
      id: 2,
      title: 'DSA Accelerator',
      batch: 'Evening Batch',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
      percent: 40,
      status: 'Completed',
      currentTopic: 'Recursion - Assignment 5',
      live: { isLive: false },
      quizzing: { isQuizLive: false }
    }
  ];

  // For tab navigation and for viewing single course details
  view: 'dashboard' | 'course' = 'dashboard';
  selectedCourse: any = null;
  activeTab = 'chapters';

  ISTString(dateStr: string) {
    return new Date(dateStr).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  }

  // When user clicks a course card
  continueLearning(course: any) 
  {
    debugger
    this.selectedCourse = course//this. enrolledCourses[0] ;//course;
    this.view = 'course';
      this.getCourseById(course.courseId);
      this.GetClassesConductedHistory(this.selectedCourse.courseId,this.selectedCourse.batchId);
  }


  RenewCourse(CourseId:any)
  { 
window.open(`/app/course-details?id=${CourseId}`,'_blank');
  }

  // When user goes back
  goBack() {
    this.view = 'dashboard';
    this.selectedCourse = null;
    this.activeTab = 'chapters';
  }

AvailableCourse:any = [];
Course:any
courseModules:any = [];

  GetMyCourses( )
  {
    this.mycourses.GetMyCourses().subscribe({
      next: (response: any) => 
        {
          this.AvailableCourse = response.result;
           
          console.log('My Courses:', this.AvailableCourse);
      },
      error: (error: any) => {
        console.error('Error fetching courses:', error);
      }
    }); 

  }


  getCourseById(id: any) {
  try {
    this.Courses.GetCourseById_admin(id).subscribe({
      next: (response: any) => {
        if (!response) {
          console.warn('Empty response received');
          return;
        }
         
        // Extract both parts
        const item1 = response.Item1 || {};
        const item2 = response.Item2 || {};

        // Merge key fields from Item2 into Item1 if missing
        this.Course = {
          ...item1,
          ShortDescription: item2.ShortDescription || item1.ShortDescription || '',
          Overview: item2.Overview   || '',
          Duration: item2.Duration || '',
          Level: item2.Level || item1.CourseLevel || '',
          Highlights: item2.Highlights || item1.Highlights || [],
          Requirements: item1.Requirements || [],
          Objectives: item1.Objectives || [],
          Batches: item1.Batches || [],
          Installments: item1.Installments || [],
        };
 
        // Optional: Store separately if needed
      
        this.courseModules = response.Item3 || [];
        debugger
        console.log('Parsed Course:', this.Course);
        console.log(this.Course?.Highlights);
      },
      error: (err) => {
        console.error('API Error:', err);
      },
    });
  } catch (err) {
    console.error('Unexpected Error:', err);
  }
}


  openLessons: boolean[] = [];

toggleLesson(index: number) 
{
  this.openLessons[index] = !this.openLessons[index];
}

isLessonOpen(index: number): boolean {
  return this.openLessons[index];
}

GetOngoingClass()
{
  this.mycourses.GetOngoingClass().subscribe({
    next: (response: any) => 
      {
        this.classannouncement = response.result;
      console.log('Ongoing Class:', this.classannouncement);
    },error: (error: any) => {
      console.error('Error fetching ongoing class:', error);
    }

  })
}

JoinLiveSession(data: any) 
{
  debugger
  //localStorage.setItem('cdn',data.HlsPlaybackUrl);
  const params = new URLSearchParams({
    CourseId: data.courseId,
    BatchId: data.batchId,
    ChatroomId:   data.chatroom_id,
     type: 'resume',
  }).toString();

  window.open(`/studentclass?${params}`, '_blank');
}


GetClassesConductedHistory(courseid:any,batchid:any)
{
   this.mycourses.GetClassesConductedHistory(courseid,batchid).subscribe({
    next: (response: any) => 
      {
         
        this.Liveclasshistroy = response.result;
        
    },error: (error: any) => {
     }

  })
}

convertToIST(dateStr: string): Date {
  if (!dateStr) return new Date();

  const utcDate = new Date(dateStr + 'Z'); // force UTC
  return new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));
}

getsecondsorminutes(seconds: number): string {
  if (!seconds) return '';

  if (seconds < 60) {
    return seconds + ' sec';
  }

  const mins = Math.floor(seconds / 60);
  return mins + ' min';
}

getAttendanceText(cls: any): string {
  const attended = cls.AttendedDuration || 0;
  const total = (cls.Duration || 0) * 60; // convert mins → sec

  if (attended === 0) return   'Not Attended';

  const percent = (attended / total) * 100;

  if (percent >= 80) return 'Attended';
  if (percent >= 30) return 'Partially Attended';
  if (attended < 300) return 'Joined briefly'; // <5 min

  return 'Partially Attended';
}
getAttendanceClass(cls: any): string {
  const attended = cls.AttendedDuration || 0;
  const total = (cls.Duration || 0) * 60;

  if (attended === 0)
    return 'px-2 py-1 rounded-full bg-red-100 text-red-600';

  const percent = (attended / total) * 100;

  if (percent >= 80)
    return 'px-2 py-1 rounded-full bg-green-100 text-green-700';

  if (percent >= 30)
    return 'px-2 py-1 rounded-full bg-yellow-100 text-yellow-700';

  return 'px-2 py-1 rounded-full bg-gray-100 text-gray-600';
}

}
