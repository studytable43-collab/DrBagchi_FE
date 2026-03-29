import { Component } from '@angular/core';
import { StudentserviceService } from '../studentservice.service';
import { CoursesService } from '../courses.service';
import { MyCoursesService } from '../my-courses.service';
 
@Component({
  selector: 'app-dashbaord',
  standalone: false,
  templateUrl: './dashbaord.component.html',
  styleUrl: './dashbaord.component.css'
})
export class DashbaordComponent
 {

  constructor(private studentservice:StudentserviceService,private coursesservice:CoursesService,private mycourses:MyCoursesService)
  {
    this.GetDashboard();
    this.GetOngoingClass()
  }
  user = {
    name: 'Student Name',
    email: '[email protected]',
    profileImage: 'https://i.pravatar.cc/100?img=5'
  };

  notifications = [
    { message: 'Biology Class scheduled for tomorrow', type: 'info' },
    { message: 'Payment received for Course #BIO101', type: 'success' },
  ];
 
 

  availableCourses = [
    { name: 'Math Foundation', price: 499 },
    { name: 'English Grammar', price: 399 }
  ];

  upcomingClasses:any =[ ];

    // ================= EXPIRING COURSES =================
  expiringCourses :any= [];

  // ================= DASHBOARD STATS =================
  avgClassesAttended = 0;

  payments = [
    { course: 'Biology 101', date: '2025-08-21', amount: 699, status: 'Paid' },
    { course: 'Physics Fundamentals', date: '2025-08-10', amount: 599, status: 'Pending' }
  ];

  sidebarOpen = false;
   ngOnInit() {}
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

    calculateExpiringCourses() {
    this.expiringCourses = this.enrolledCourses.filter((c:any) => c.daysLeft <= 7);
  }

  // ================= CALCULATE AVERAGE ATTENDANCE =================
  calculateAverageAttendance() {

    let totalAttended = 0;
    let totalCourses = this.enrolledCourses.length;

    this.enrolledCourses.forEach((c:any) => {
      totalAttended += c.attendedThisMonth;
    });

    this.avgClassesAttended =
      totalCourses > 0
        ? Math.round(totalAttended / totalCourses)
        : 0;
  }

Dashboarddata:any = [];


GetDashboard() {
  try {
    this.studentservice.getdashboarddata().subscribe({
      next: (response: any) => {
        this.Dashboarddata = response.result
        this.upcomingClasses = this.Dashboarddata.todaySessions;
          this.getAllCourses();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  } catch (error: any) {
    console.error(error);
  }
}
 
enrolledCourses:any = [];

getAllCourses() {
  this.coursesservice.getAllCourses().subscribe({
    next: (response: any) =>
     {
      let courses = response.result;
       
      const enrolledIds = new Set(this.Dashboarddata.enrollments.map((e: any) => e.courseId));

    this.enrolledCourses = response.result.filter((x: any) =>  enrolledIds.has(x.CourseId));
           if(this.enrolledCourses.length > 0)
          {
      this.enrolledCourses = response.result.map((x: any) => {
  const desc = JSON.parse(x.Description);

  return {
    ...x,
    shortDescription: desc.ShortDescription
  };
});

          }


 
      console.log(response);
    },
    error: (error: any) => {
      console.error('API Error:', error);
    }
  });
}

Ongoingcourse:any
GetOngoingClass()
{
  this.mycourses.GetOngoingClass().subscribe({
    next: (response: any) => 
      {
        this.Ongoingcourse = response.result;
     },error: (error: any) => {
      console.error('Error fetching ongoing class:', error);
    }

  })
}


JoinLiveSession(data: any) 
{
   
  //localStorage.setItem('cdn',data.HlsPlaybackUrl);
  const params = new URLSearchParams({
    CourseId: data.courseId,
    BatchId: data.batchId,
    ChatroomId:   data.chatroom_id,
     type: 'resume',
  }).toString();

  window.open(`/studentclass?${params}`, '_blank');
}



}
