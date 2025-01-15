import { TableHead, TableHeader as Header, TableRow } from "@/components/ui/table";

export default function SalesRepTableHeader() {
  return (
    <Header>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Company</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Phone</TableHead>
        <TableHead>Country</TableHead>
        <TableHead>State</TableHead>
        <TableHead>Visa Price</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </Header>
  );
} 