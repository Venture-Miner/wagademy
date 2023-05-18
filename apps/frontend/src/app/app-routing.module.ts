import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@/guards';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('@/landing').then((m) => m.LandingModule),
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
          import('@/access-portal').then((m) => m.CreateProfileModule),
      },
      {
        path: 'squads',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@/access-portal').then((m) => m.SquadsModule),
      },
      {
        path: 'my-contacts',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@/access-portal').then((m) => m.MyContactsModule),
      },
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('@/access-portal').then((m) => m.HomeModule),
      },
      {
        path: 'home/profile',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@/access-portal').then((m) => m.ProfileModule),
      },
      {
        path: 'home/profile/profile-edit',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@/access-portal').then((m) => m.ProfileEditModule),
      },
      {
        path: 'home/course-details/info',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@/access-portal').then((m) => m.CourseDetailsInfoModule),
      },
      {
        path: 'create-company-profile',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@/access-portal').then((m) => m.CreateCompanyProfileModule),
      },
      {
        path: 'about',
        loadChildren: () => import('@/learning').then((m) => m.LearningModule),
      },
      {
        path: 'recommendations',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@/access-portal').then((m) => m.RecommendationsPageModule),
      },
      {
        path: 'friend-requests',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@/access-portal').then((m) => m.FriendRequestsModule),
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
          import('@/access-portal').then((m) => m.MyCertificatesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
