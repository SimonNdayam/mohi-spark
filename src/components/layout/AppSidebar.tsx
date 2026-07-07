import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  MapPinned,
  HeartHandshake,
  UserCog,
  FileBarChart2,
  Sparkles,
  BookOpenCheck,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const primary = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Students", url: "/students", icon: Users },
  { title: "Departments", url: "/departments", icon: Building2 },
  { title: "Trainers", url: "/trainers", icon: UserCog },
];

const academic = [
  { title: "Academic", url: "/academic", icon: BookOpenCheck },
  { title: "Examinations", url: "/exams", icon: GraduationCap },
];

const outcomes = [
  { title: "Attachment", url: "/attachment", icon: MapPinned },
  { title: "Job Placement", url: "/placement", icon: Briefcase },
  { title: "Discipleship", url: "/discipleship", icon: HeartHandshake },
];

const intelligence = [
  { title: "AI Insights", url: "/insights", icon: Sparkles },
  { title: "Reports", url: "/reports", icon: FileBarChart2 },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (url: string) => pathname === url || pathname.startsWith(url + "/");

  const Section = ({ label, items }: { label: string; items: typeof primary }) => (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sidebar-foreground/60 uppercase text-[10px] tracking-wider font-semibold px-2">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.url)}
                className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium hover:bg-sidebar-accent/60"
              >
                <Link to={item.url} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="border-b border-sidebar-border/60 px-4 py-4">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg gradient-primary grid place-items-center shadow-glass">
            <span className="text-primary-foreground font-bold text-sm">M</span>
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sidebar-foreground font-semibold text-sm">MOHI TTI</span>
            <span className="text-sidebar-foreground/60 text-[11px]">Student Management</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="gap-1">
        <Section label="Overview" items={primary} />
        <Section label="Academic" items={academic} />
        <Section label="Outcomes" items={outcomes} />
        <Section label="Intelligence" items={intelligence} />
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/60 p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="h-8 w-8 rounded-full bg-sidebar-accent grid place-items-center text-sidebar-accent-foreground text-xs font-semibold">
            SA
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sidebar-foreground text-xs font-medium">System Admin</span>
            <span className="text-sidebar-foreground/60 text-[11px]">Super Administrator</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
