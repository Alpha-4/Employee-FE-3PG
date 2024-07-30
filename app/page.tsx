import Employee from "@/components/Employee";
import EmployeeList from "@/components/EmployeeList";

export default function Home() {
  return (
    <main className="min-h-screen p-10 flex-col">
      <EmployeeList/>
    </main>
  );
}
