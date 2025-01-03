export const QuickLinks = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-2">
        {["Home", "Destinations", "Offers", "Visa Services", "About Us", "Contact"].map((link) => (
          <li key={link}>
            <a href="#" className="hover:text-primary transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};