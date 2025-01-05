import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const NewsletterForm = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
      <p className="mb-4">Subscribe for the latest deals and updates.</p>
      <div className="space-y-2">
        <Input
          placeholder="Enter your email"
          className="bg-gray-800 border-gray-700"
        />
        <Button className="w-full">Subscribe</Button>
      </div>
    </div>
  );
};