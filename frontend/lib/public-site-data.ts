export type PublicService = {
  title: string;
  description: string;
};

export type PortfolioItem = {
  title: string;
  category: string;
  location: string;
  description: string;
  highlights: string[];
  imageSrc: string;
  imageAlt: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const services: PublicService[] = [
  {
    title: "Custom Furniture",
    description:
      "Built-in cabinets, shelving, tables, wardrobes, and made-to-measure furniture for homes and businesses.",
  },
  {
    title: "Construction & Interior Remodeling",
    description:
      "Interior construction, remodeling, finish improvements, room updates, and practical renovation support.",
  },
  {
    title: "Kitchen & Storage",
    description:
      "Kitchen cabinets, storage solutions, countertops, and functional interior improvements.",
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    title: "Kitchen Cabinet Installation",
    category: "Kitchen / Cabinets",
    location: "Luanda",
    description:
      "Custom kitchen cabinet work designed to improve storage, finish quality, and daily usability.",
    highlights: [
      "Custom measurements",
      "Storage-focused layout",
      "Clean cabinet finish",
    ],
    imageSrc: "/projects/kitchen-cabinet-installation.webp",
    imageAlt: "Custom kitchen cabinet installation by Cafocolo",
  },
  {
    title: "Interior Renovation",
    category: "Construction / Remodeling",
    location: "Luanda",
    description:
      "Interior construction and remodeling work focused on clean finishes, durable materials, and practical room improvements.",
    highlights: [
      "Interior finish improvements",
      "Practical room updates",
      "Material planning",
    ],
    imageSrc: "/projects/interior-renovation.webp",
    imageAlt: "Interior renovation and finish project by Cafocolo",
  },
  {
    title: "Custom Wood Furniture",
    category: "Furniture",
    location: "Luanda",
    description:
      "Made-to-order furniture pieces built around the client's space, preferred dimensions, and daily needs.",
    highlights: [
      "Made-to-measure build",
      "Functional design",
      "Custom woodwork",
    ],
    imageSrc: "/projects/custom-wood-furniture.webp",
    imageAlt: "Custom wood furniture project by Cafocolo",
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Request a quote",
    description:
      "The customer submits basic project details, location, and contact information.",
  },
  {
    step: "02",
    title: "Review the project",
    description:
      "Cafocolo reviews the request, clarifies scope, and prepares the next steps.",
  },
  {
    step: "03",
    title: "Build the estimate",
    description:
      "The project is organized into materials, labor, and itemized quote details.",
  },
  {
    step: "04",
    title: "Start the work",
    description:
      "Once the estimate is accepted, the project can move into planning and execution.",
  },
];