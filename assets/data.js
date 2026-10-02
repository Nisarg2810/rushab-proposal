/* Package data for the prototype. The Andaman package is their real one, taken from their live site. */
window.PKGS = [
  {
    id: 'andaman-3n',
    name: 'A Short Trip to Andaman',
    dest: 'Andaman', country: 'India', theme: ['Beach', 'Family'],
    nights: 3, days: 4, price: 18500, was: 21000,
    rating: 4.6, reviews: 128, sold: 212,
    from: ['Mumbai', 'Delhi', 'Bengaluru', 'Ahmedabad'],
    months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    blurb: 'Two nights in Port Blair and one on Havelock, with Cellular Jail, the Light and Sound show and Radhanagar Beach.',
    cities: [{ name: 'Port Blair', nights: 2 }, { name: 'Havelock Island', nights: 1 }],
    hotels: [
      { city: 'Port Blair, Andaman and Nicobar Islands', name: 'OLIVE HOTEL or BELL ELITE', star: 3, dates: '30 Oct 26 to 01 Nov 26', room: 'Deluxe room', meal: 'Breakfast only (CP)' },
      { city: 'Havelock Island, Andaman and Nicobar Islands', name: 'HAYWIZZ HAVELOCK or ILE BAY', star: 3, dates: '01 Nov 26 to 02 Nov 26', room: 'Deluxe room', meal: 'Breakfast only (CP)' }
    ],
    itinerary: [
      { day: 1, title: 'Arrival at Port Blair and local sightseeing', items: ['Warm welcome at Veer Savarkar International Airport.', 'Meet and greet, then transfer to the hotel.', 'Afternoon sightseeing: Marina Park, Flag Point, Cellular Jail.', 'Light and Sound show at Cellular Jail in the evening.', 'Overnight stay in Port Blair.'] },
      { day: 2, title: 'Port Blair to Havelock and Radhanagar Beach', items: ['Breakfast, check out and transfer to the harbour.', 'Air conditioned cruise to Havelock Island.', 'Check in, then visit Radhanagar Beach after lunch.', 'Sunset at the beach, then back to the hotel.', 'Overnight stay at Havelock.'] },
      { day: 3, title: 'Havelock back to Port Blair', items: ['Breakfast and check out.', 'Ferry back to Port Blair.', 'Complimentary shopping transfer to Samudrika Emporium.', 'Overnight stay in Port Blair.'] },
      { day: 4, title: 'Departure', items: ['Breakfast at the hotel.', 'Transfer to the airport for your flight home.'] }
    ],
    sights: [
      { name: 'Marina Park', note: 'Small park with scenic views, a kids play area and a long pier with access to boating and water sports.' },
      { name: 'Flag Point', note: 'Known for its towering flagpole of 161 feet, proudly displaying the Indian tricolour.' },
      { name: 'Cellular Jail', note: 'Also known as Kala Pani, a former British colonial prison in the Andaman and Nicobar Islands.' },
      { name: 'Light and Sound Show', note: 'Narrates the history of the jail, with freedom fighters before and after independence.' },
      { name: 'Samudrika Emporium', note: 'Government authorised store for handicrafts, pearl jewellery and local souvenirs.' },
      { name: 'Radhanagar Beach', note: 'Famous for white sand and turquoise water, with a Blue Flag eco certification.' }
    ],
    inc: ['Accommodation in air conditioned rooms on double sharing basis.', 'Daily breakfast only.', 'All transfers and sightseeing by private car, point to point.', 'Port Blair to Havelock by air conditioned cruise.', 'Entry to Cellular Jail Light and Sound show.', 'All entry, monument, parking and permit charges as per itinerary.', 'Meet and assist at all arrival and departure points by our representative.'],
    exc: ['Airfare.', 'Anything not mentioned in the inclusions.', 'Lunch and dinner.', 'Personal expenses, tips and travel insurance.'],
    notes: ['The above itinerary is subject to weather conditions and may be changed for your convenience and ferry timings.', 'Being an island, water activities are subject to point to point basis only as per shared itinerary.', 'Child above two years and below five years at 50 percent of cost, ferry charges applicable.', 'Child below two years is complimentary without a mattress.'],
    cancel: ['60 percent before 30 days of check in.', '50 percent before 45 days of check in.', '80 percent before 30 days of check in.', '100 percent within 20 days from date of departure.'],
    pay: ['100 percent of flight cost at booking.', '50 percent of package amount at the time of booking.', '100 percent before 25 days of travelling date.']
  },
  { id: 'kerala-5n', name: 'Kerala Backwaters and Hills', dest: 'Kerala', country: 'India', theme: ['Honeymoon', 'Nature'], nights: 5, days: 6, price: 24900, was: 28500, rating: 4.7, reviews: 96, sold: 164,
    from: ['Mumbai', 'Delhi', 'Ahmedabad'], months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    blurb: 'Munnar tea gardens, Thekkady spice trails and a night on an Alleppey houseboat, ending in Kochi.',
    cities: [{ name: 'Munnar', nights: 2 }, { name: 'Thekkady', nights: 1 }, { name: 'Alleppey', nights: 1 }, { name: 'Kochi', nights: 1 }] },
  { id: 'bali-5n', name: 'Bali Beaches and Ubud', dest: 'Bali', country: 'Indonesia', theme: ['Honeymoon', 'Beach'], nights: 5, days: 6, price: 46900, was: 52000, rating: 4.8, reviews: 211, sold: 309,
    from: ['Mumbai', 'Delhi', 'Bengaluru'], months: ['Oct', 'Nov', 'Dec', 'Mar', 'Apr'],
    blurb: 'Two nights in Ubud among the rice terraces, three in Seminyak, with a private pool villa night included.',
    cities: [{ name: 'Ubud', nights: 2 }, { name: 'Seminyak', nights: 3 }] },
  { id: 'dubai-4n', name: 'Dubai City and Desert', dest: 'Dubai', country: 'UAE', theme: ['Family', 'City'], nights: 4, days: 5, price: 52500, was: 58000, rating: 4.5, reviews: 143, sold: 240,
    from: ['Mumbai', 'Ahmedabad', 'Delhi'], months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    blurb: 'Burj Khalifa, a desert safari with barbecue dinner, a dhow cruise and a full day at the Museum of the Future.',
    cities: [{ name: 'Dubai', nights: 4 }] },
  { id: 'thailand-5n', name: 'Bangkok and Pattaya', dest: 'Thailand', country: 'Thailand', theme: ['Friends', 'Beach'], nights: 5, days: 6, price: 38900, was: 43500, rating: 4.4, reviews: 178, sold: 287,
    from: ['Mumbai', 'Delhi', 'Kolkata'], months: ['Nov', 'Dec', 'Jan', 'Feb'],
    blurb: 'Coral island day trip, Alcazar show, floating market and two free evenings in Bangkok.',
    cities: [{ name: 'Pattaya', nights: 2 }, { name: 'Bangkok', nights: 3 }] },
  { id: 'kashmir-6n', name: 'Kashmir Valley in Full', dest: 'Kashmir', country: 'India', theme: ['Family', 'Nature'], nights: 6, days: 7, price: 31500, was: 36000, rating: 4.9, reviews: 87, sold: 121,
    from: ['Delhi', 'Mumbai', 'Ahmedabad'], months: ['Mar', 'Apr', 'May', 'Jun', 'Sep'],
    blurb: 'Srinagar houseboat, Gulmarg gondola, Pahalgam valleys and a shikara ride on Dal Lake at sunset.',
    cities: [{ name: 'Srinagar', nights: 3 }, { name: 'Gulmarg', nights: 1 }, { name: 'Pahalgam', nights: 2 }] },
  { id: 'maldives-3n', name: 'Maldives Water Villa Escape', dest: 'Maldives', country: 'Maldives', theme: ['Honeymoon', 'Beach'], nights: 3, days: 4, price: 74900, was: 82000, rating: 4.9, reviews: 64, sold: 78,
    from: ['Mumbai', 'Bengaluru', 'Delhi'], months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    blurb: 'Three nights in a water villa with half board, speedboat transfers and a sunset dolphin cruise.',
    cities: [{ name: 'Male Atoll', nights: 3 }] },
  { id: 'rajasthan-5n', name: 'Royal Rajasthan Circuit', dest: 'Rajasthan', country: 'India', theme: ['Family', 'Heritage'], nights: 5, days: 6, price: 22400, was: 26000, rating: 4.5, reviews: 102, sold: 157,
    from: ['Mumbai', 'Delhi', 'Ahmedabad'], months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    blurb: 'Jaipur forts, Jodhpur blue city and two nights in Udaipur by the lake, with a heritage haveli stay.',
    cities: [{ name: 'Jaipur', nights: 2 }, { name: 'Jodhpur', nights: 1 }, { name: 'Udaipur', nights: 2 }] }
];

window.DESTS = [
  { name: 'Andaman', n: 14, tag: 'Beaches' }, { name: 'Kerala', n: 11, tag: 'Backwaters' },
  { name: 'Kashmir', n: 9, tag: 'Mountains' }, { name: 'Rajasthan', n: 12, tag: 'Heritage' },
  { name: 'Dubai', n: 16, tag: 'City breaks' }, { name: 'Thailand', n: 13, tag: 'Island hops' },
  { name: 'Bali', n: 10, tag: 'Honeymoon' }, { name: 'Maldives', n: 7, tag: 'Water villas' }
];

window.LEADS = [
  { id: 'L-2041', name: 'Rhea Shah', phone: '+91 98250 44120', email: 'rhea.shah@gmail.com', pkg: 'A Short Trip to Andaman', dest: 'Andaman', date: '30 Oct 26', pax: '2 adults', budget: '35k to 50k', value: 37000, src: 'Google Ads', utm: 'utm_campaign=andaman-oct', city: 'Ahmedabad', device: 'iPhone', time: '4 min 12 s', pages: 6, status: 'New', when: '12 minutes ago', wa: true },
  { id: 'L-2040', name: 'Imran Qureshi', phone: '+91 99300 71882', email: 'imran.q@outlook.com', pkg: 'Dubai City and Desert', dest: 'Dubai', date: '14 Dec 26', pax: '2 adults, 1 child', budget: '1L to 1.5L', value: 131000, src: 'WhatsApp bubble', utm: 'direct', city: 'Mumbai', device: 'Android', time: '7 min 02 s', pages: 9, status: 'Contacted', when: '1 hour ago', wa: true },
  { id: 'L-2039', name: 'Meera Nair', phone: '+91 96320 55410', email: 'meera.nair@yahoo.in', pkg: 'Maldives Water Villa Escape', dest: 'Maldives', date: '02 Feb 27', pax: '2 adults', budget: '1.5L plus', value: 149800, src: 'Instagram', utm: 'utm_source=ig_story', city: 'Bengaluru', device: 'iPhone', time: '9 min 48 s', pages: 12, status: 'Quoted', when: '3 hours ago', wa: true },
  { id: 'L-2038', name: 'Sanjay Patel', phone: '+91 94260 30017', email: 'sanjay@patelexports.in', pkg: 'Kerala Backwaters and Hills', dest: 'Kerala', date: '20 Nov 26', pax: '4 adults', budget: '75k to 1L', value: 99600, src: 'Organic search', utm: 'kerala honeymoon package', city: 'Surat', device: 'Desktop', time: '5 min 31 s', pages: 7, status: 'Quoted', when: 'Yesterday', wa: false },
  { id: 'L-2037', name: 'Aisha Khan', phone: '+91 90040 12277', email: 'aisha.k@gmail.com', pkg: 'Bali Beaches and Ubud', dest: 'Bali', date: '08 Mar 27', pax: '2 adults', budget: '75k to 1L', value: 93800, src: 'Google Ads', utm: 'utm_campaign=bali-honeymoon', city: 'Pune', device: 'Android', time: '11 min 09 s', pages: 14, status: 'Won', when: 'Yesterday', wa: true },
  { id: 'L-2036', name: 'Vikram Rao', phone: '+91 98450 66190', email: 'vikram.rao@zoho.com', pkg: 'Kashmir Valley in Full', dest: 'Kashmir', date: '18 Apr 27', pax: '2 adults, 2 children', budget: '1L to 1.5L', value: 110250, src: 'Referral', utm: 'direct', city: 'Hyderabad', device: 'Desktop', time: '6 min 44 s', pages: 8, status: 'Contacted', when: '2 days ago', wa: true },
  { id: 'L-2035', name: 'Nisha Mehta', phone: '+91 97370 88214', email: 'nisha.mehta@gmail.com', pkg: 'Royal Rajasthan Circuit', dest: 'Rajasthan', date: '05 Jan 27', pax: '6 adults', budget: '1L to 1.5L', value: 134400, src: 'Organic search', utm: 'rajasthan family package', city: 'Ahmedabad', device: 'Android', time: '8 min 17 s', pages: 10, status: 'New', when: '2 days ago', wa: true },
  { id: 'L-2034', name: 'Rahul Bhatt', phone: '+91 99790 45503', email: 'rahul.bhatt@live.com', pkg: 'Bangkok and Pattaya', dest: 'Thailand', date: '22 Dec 26', pax: '4 adults', budget: '1.5L plus', value: 155600, src: 'Google Ads', utm: 'utm_campaign=thailand-dec', city: 'Rajkot', device: 'iPhone', time: '3 min 55 s', pages: 5, status: 'Lost', when: '3 days ago', wa: false }
];
