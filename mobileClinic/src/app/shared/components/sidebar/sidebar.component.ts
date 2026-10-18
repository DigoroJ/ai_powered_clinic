import { Component } from '@angular/core';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      label: 'Patients',
      icon: 'people',
      route: '/patients'
    },
    {
      label: 'Doctors',
      icon: 'medical_services',
      route: '/doctors'
    },
    {
      label: 'Nurses',
      icon: 'health_and_safety',
      route: '/nurses'
    },
    {
      label: 'Appointments',
      icon: 'calendar_month',
      route: '/appointments'
    },
    {
      label: 'Medical Records',
      icon: 'description',
      route: '/medical-records'
    },
    {
      label: 'AI Triage',
      icon: 'psychology',
      route: '/ai-triage'
    },
    {
      label: 'AI Analytics',
      icon: 'analytics',
      route: '/ai-analytics'
    },
    {
      label: 'Dataset & EDA',
      icon: 'dataset',
      route: '/dataset-eda'
    },
    {
      label: 'Reports',
      icon: 'bar_chart',
      route: '/reports'
    },
    {
      label: 'Settings',
      icon: 'settings',
      route: '/settings'
    }
  ];

}