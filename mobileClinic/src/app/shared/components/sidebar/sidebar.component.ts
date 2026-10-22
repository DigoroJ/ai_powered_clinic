import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

type UserRole = 'admin' | 'doctor' | 'nurse';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  menuItems: MenuItem[] = [];
  currentRole: UserRole = 'admin';

  private routerSubscription?: Subscription;

  private readonly adminMenu: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Patients', icon: 'people', route: '/patients' },
    { label: 'Doctors', icon: 'medical_services', route: '/doctors' },
    { label: 'Nurses', icon: 'health_and_safety', route: '/nurses' },
    { label: 'Appointments', icon: 'calendar_month', route: '/appointments' },
    { label: 'Medical Records', icon: 'description', route: '/medical-records' },
    { label: 'AI Analytics', icon: 'analytics', route: '/ai-analytics' },
    { label: 'Dataset & EDA', icon: 'dataset', route: '/dataset-eda' },
    { label: 'Reports', icon: 'bar_chart', route: '/reports' },
    { label: 'Settings', icon: 'settings', route: '/settings' }
  ];

  private readonly doctorMenu: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/doctor/dashboard' },
    { label: 'Appointments', icon: 'calendar_month', route: '/doctor/appointments' },
    { label: 'Patients', icon: 'people', route: '/doctor/patients' },
    { label: 'Medical Records', icon: 'description', route: '/doctor/medical-records' },
    { label: 'AI Triage', icon: 'psychology', route: '/doctor/ai-triage' },
    { label: 'Settings', icon: 'settings', route: '/doctor/settings' }
  ];

  private readonly nurseMenu: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/nurse/dashboard' },
    { label: 'Patient Queue', icon: 'groups', route: '/nurse/appointments' },
    { label: 'Patients', icon: 'people', route: '/nurse/patients' },
    { label: 'Medical Records', icon: 'description', route: '/nurse/medical-records' },
    { label: 'AI Triage', icon: 'psychology', route: '/nurse/ai-triage' },
    { label: 'Settings', icon: 'settings', route: '/nurse/settings' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateMenu();

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateMenu());
  }

  private updateMenu(): void {
    const url = this.router.url;

    // Infer the role from the route prefix.
    if (url.startsWith('/doctor/')) {
      this.currentRole = 'doctor';
    } else if (url.startsWith('/nurse/')) {
      this.currentRole = 'nurse';
    } else {
      this.currentRole = 'admin';
    }

    switch (this.currentRole) {
      case 'doctor':
        this.menuItems = this.doctorMenu;
        break;

      case 'nurse':
        this.menuItems = this.nurseMenu;
        break;

      default:
        this.menuItems = this.adminMenu;
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }
}