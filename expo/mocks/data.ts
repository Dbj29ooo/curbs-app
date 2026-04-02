export interface DesignType {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  title: string;
  text: string;
  verified: boolean;
}

export interface ServiceArea {
  id: string;
  name: string;
  cities: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export const curbDesignImages = {
  hero: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/yhhlmroyna5kjma3puvdx',
  galleryOne: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/yhhlmroyna5kjma3puvdx',
  galleryTwo: 'https://curbnsign.com/cdn/shop/files/Main_Image_1aa3c844-8520-4dde-8ba2-1ed3c73c94e7_grande.png?v=1721248423',
  galleryThree: 'https://i.etsystatic.com/12710617/r/il/82b356/3474982984/il_fullxfull.3474982984_7eog.jpg',
  galleryFour: 'https://cms.modernhousenumbers.com/assets/preview_stencil_1.jpg',
  galleryFive: 'https://cms.modernhousenumbers.com/assets/preview_stencil_3.jpg',
  gallerySix: 'https://cms.modernhousenumbers.com/assets/guide_stencil_font_sb_1.jpg',
} as const;

export const designTypes: DesignType[] = [
  {
    id: '1',
    title: 'Classic Scroll Border',
    description: 'Timeless elegance with flowing scroll patterns that frame your property beautifully. Perfect for traditional and colonial-style homes.',
    image: curbDesignImages.galleryOne,
    features: ['Hand-stamped patterns', 'Multiple color options', 'UV-resistant finish', '25-year warranty'],
  },
  {
    id: '2',
    title: 'Modern Geometric',
    description: 'Clean lines and bold geometric shapes for contemporary properties. Adds a sleek, architectural accent to any landscape.',
    image: curbDesignImages.galleryTwo,
    features: ['Sharp angular designs', 'Minimalist aesthetic', 'Concrete or stamped', 'Custom dimensions'],
  },
  {
    id: '3',
    title: 'Natural Stone Look',
    description: 'Mimics the appearance of natural stacked stone with remarkable realism. Brings rustic charm without the premium cost.',
    image: curbDesignImages.galleryThree,
    features: ['Realistic texture', 'Earth-tone colors', 'Weather resistant', 'Low maintenance'],
  },
  {
    id: '4',
    title: 'Brick Pattern',
    description: 'Classic brick-style curbing that complements any architectural style. Provides structure and definition to garden beds.',
    image: curbDesignImages.galleryFour,
    features: ['Authentic brick look', 'Interlocking design', 'Durable finish', 'Color-matched options'],
  },
  {
    id: '5',
    title: 'Flagstone Elegance',
    description: 'Irregular flagstone patterns create an organic, natural border. Ideal for cottage gardens and Mediterranean landscapes.',
    image: curbDesignImages.galleryFive,
    features: ['Organic shapes', 'Multi-tone coloring', 'Seamless installation', 'Custom widths'],
  },
  {
    id: '6',
    title: 'Mower Edge',
    description: 'Functional and beautiful flat curbing designed for easy lawn mowing. Clean separation between grass and garden beds.',
    image: curbDesignImages.gallerySix,
    features: ['Mower-friendly', 'Flush installation', 'Clean edges', 'Practical design'],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    location: 'Austin, TX',
    text: 'CurbCraft completely transformed our front yard. The scroll border design adds so much character to our home. Neighbors constantly stop to compliment it!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'James Rodriguez',
    location: 'Denver, CO',
    text: 'Professional from start to finish. The team was punctual, clean, and the finished product exceeded our expectations. Highly recommend!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'Linda Chen',
    location: 'Portland, OR',
    text: 'We went with the natural stone look and it is absolutely stunning. It has held up beautifully through two winters already.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
  {
    id: '4',
    name: 'Robert Thompson',
    location: 'Phoenix, AZ',
    text: 'Great value for money. The geometric design really modernized our landscape. The crew finished in one day!',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Mark S.',
    date: '2026-03-15',
    rating: 5,
    title: 'Best investment for our property',
    text: 'The curbing looks amazing and has really increased our curb appeal. The installation team was professional and efficient. Would definitely hire again.',
    verified: true,
  },
  {
    id: '2',
    name: 'Patricia W.',
    date: '2026-03-01',
    rating: 5,
    title: 'Outstanding craftsmanship',
    text: 'From the initial consultation to the final walkthrough, everything was perfect. The attention to detail is remarkable.',
    verified: true,
  },
  {
    id: '3',
    name: 'David L.',
    date: '2026-02-20',
    rating: 4,
    title: 'Very pleased with the results',
    text: 'Beautiful work overall. Minor scheduling delay but the end result was worth the wait. The brick pattern looks incredible.',
    verified: true,
  },
  {
    id: '4',
    name: 'Karen B.',
    date: '2026-02-10',
    rating: 5,
    title: 'Transformed our garden',
    text: 'The flagstone border around our garden beds looks like it was always there. Natural and elegant. Five stars all around.',
    verified: true,
  },
  {
    id: '5',
    name: 'Tom H.',
    date: '2026-01-28',
    rating: 5,
    title: 'Professional and affordable',
    text: 'Got quotes from several companies and CurbCraft offered the best value. The quality speaks for itself.',
    verified: false,
  },
  {
    id: '6',
    name: 'Emily R.',
    date: '2026-01-15',
    rating: 4,
    title: 'Great curb appeal boost',
    text: 'Our realtor said the curbing added significant value to our home. Clean work and friendly crew.',
    verified: true,
  },
];

export const serviceAreas: ServiceArea[] = [
  {
    id: '1',
    name: 'Texas',
    cities: ['Austin', 'San Antonio', 'Dallas', 'Houston', 'Fort Worth', 'Round Rock', 'Cedar Park'],
  },
  {
    id: '2',
    name: 'Colorado',
    cities: ['Denver', 'Colorado Springs', 'Boulder', 'Fort Collins', 'Aurora', 'Lakewood'],
  },
  {
    id: '3',
    name: 'Arizona',
    cities: ['Phoenix', 'Scottsdale', 'Tempe', 'Mesa', 'Chandler', 'Gilbert', 'Glendale'],
  },
  {
    id: '4',
    name: 'Oregon',
    cities: ['Portland', 'Eugene', 'Salem', 'Bend', 'Beaverton', 'Lake Oswego'],
  },
  {
    id: '5',
    name: 'California',
    cities: ['Sacramento', 'San Diego', 'Los Angeles', 'San Francisco', 'San Jose', 'Fresno'],
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Michael Carter',
    role: 'Founder & Lead Designer',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop',
    bio: 'With over 20 years in landscape architecture, Michael founded CurbCraft to bring artistry to every curb line.',
  },
  {
    id: '2',
    name: 'Jessica Alvarez',
    role: 'Operations Manager',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
    bio: 'Jessica ensures every project runs smoothly from consultation to completion, maintaining our high standards.',
  },
  {
    id: '3',
    name: 'Daniel Nguyen',
    role: 'Senior Installer',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop',
    bio: 'Daniel leads our installation crews with precision and craftsmanship honed over 15 years in the field.',
  },
];
