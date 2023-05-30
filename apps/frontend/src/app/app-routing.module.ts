import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./landing/landing.module').then((m) => m.LandingModule),
      },
      {
        path: 'account-type',
        loadChildren: () =>
          import(
            './access-portal/account/account-type/account-type.module'
          ).then((m) => m.AccountTypeModule),
      },
      {
        path: 'create-profile',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            './access-portal/pages/create-profile/create-profile.module'
          ).then((m) => m.CreateProfileModule),
      },
      {
        path: 'squads',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./access-portal/pages/squads/squads.module').then(
            (m) => m.SquadsModule
          ),
      },
      {
        path: 'my-contacts',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./access-portal/pages/my-contacts/my-contacts.module').then(
            (m) => m.MyContactsModule
          ),
      },
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./access-portal/pages/home/home.module').then(
            (m) => m.HomeModule
          ),
      },
      {
        path: 'home/profile',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./access-portal/pages/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'home/profile/profile-edit',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./access-portal/pages/profile-edit/profile-edit.module').then(
            (m) => m.ProfileEditModule
          ),
      },
      {
        path: 'home/course-details/info',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            './access-portal/pages/course-details-info/course-details-info.module'
          ).then((m) => m.CourseDetailsInfoModule),
      },
      {
        path: 'create-company-profile',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            './access-portal/pages/create-company-profile/create-company-profile.module'
          ).then((m) => m.CreateCompanyProfileModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./learning/learning.module').then((m) => m.LearningModule),
      },
      {
        path: 'recommendations',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            './access-portal/pages/recommendations-page/recommendations-page.module'
          ).then((m) => m.RecommendationsPageModule),
      },
      {
        path: 'friend-requests',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            './access-portal/pages/friend-requests/friend-requests.module'
          ).then((m) => m.FriendRequestsModule),
      },
      {
        path: 'home/course-details',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            './access-portal/pages/course-details/course-details.module'
          ).then((m) => m.CourseDetailsModule),
      },
      {
        path: 'my-certificates',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            './access-portal/pages/my-certificates/my-certificates.module'
          ).then((m) => m.MyCertificatesModule),
      },
      {
        path: 'jobs-details',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./access-portal/pages/jobs-details/jobs-details.module').then(
            (m) => m.JobsDetailsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
