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
      { city: 'Port Blair, Andaman and Nicobar Islands, India', name: 'OLIVE HOTEL or BELL ELITE', star: 3, dates: '30 Oct 26 to 01 Nov 26', room: 'Deluxe room', meal: 'Breakfast only (CP)', roomInc: 'As per hotel' },
      { city: 'Havelock Island, Andaman and Nicobar Islands, India', name: 'HAYWIZZ HAVELOCK or ILE BAY', star: 3, dates: '01 Nov 26 to 02 Nov 26', room: 'Deluxe room', meal: 'Breakfast only (CP)', roomInc: 'As per hotel' }
    ],
    itinerary: [
      { day: 1, date: '30 Oct 26', title: 'Arrival at Port Blair, local sightseeing', items: [
        { t: 'Warm welcome on arrival at Veer Savarkar International Airport, Port Blair.' },
        { t: 'Meet and greet by our representative, then transfer to the hotel.' },
        { t: 'Check in and relax.' },
        { t: 'In the afternoon, proceed for local sightseeing covering:', sub: ['Marina Park', 'Flag Point', 'Cellular Jail', 'Light and Sound Show at Cellular Jail, on the saga of India\u2019s freedom fighters'] },
        { t: 'Return to the hotel for an overnight stay in Port Blair.' }
      ] },
      { day: 2, date: '31 Oct 26', title: 'Port Blair to Havelock Island, Radhanagar Beach', items: [
        { t: 'Breakfast at the hotel.' },
        { t: 'Check out and transfer to the harbour.' },
        { t: 'Board the air conditioned cruise to Havelock Island.' },
        { t: 'On arrival, transfer to the hotel and complete check in formalities.' },
        { t: 'After lunch, visit the world famous Radhanagar Beach, known for its white sand and clear turquoise water.' },
        { t: 'Enjoy the sunset before returning to the hotel.' },
        { t: 'Overnight stay at Havelock Island.' }
      ] },
      { day: 3, date: '01 Nov 26', title: 'Havelock to Port Blair', items: [
        { t: 'Breakfast and check out from the hotel.' },
        { t: 'Transfer to the harbour and board the return ferry to Port Blair.' },
        { t: 'On arrival, transfer to the hotel.' },
        { t: 'In the evening, a complimentary shopping transfer to Samudrika Emporium, one of the finest government authorised handicraft stores in the Andamans.' },
        { t: 'Overnight stay at Port Blair.' }
      ] },
      { day: 4, date: '02 Nov 26', title: 'Departure', items: [
        { t: 'Breakfast at the hotel.' },
        { t: 'Check out and transfer to Veer Savarkar International Airport for your onward journey, with beautiful memories of the Andaman Islands.' }
      ] }
    ],
    sights: [
      { name: 'Marina Park', note: 'Small park with scenic views, kids play areas and a long pier with access to boating and water sports.' },
      { name: 'Flag Point', note: 'The towering flag pole stands at 150m, proudly displaying the Indian tricolour, a symbol of national pride and unity.' },
      { name: 'Cellular Jail', note: 'Also known as Kala Pani, a former British colonial prison in the Andaman and Nicobar Islands.' },
      { name: 'Light and Sound Show, Cellular Jail', note: 'A show narrating the history of a jail whose prisoners included freedom fighters before and after independence.' },
      { name: 'Samudrika Emporium', note: 'The government run shop for authentic local handicrafts, fixed price souvenirs and island memorabilia, managed by the Andaman and Nicobar administration.' },
      { name: 'Radhanagar Beach', note: 'On Swaraj Dweep, known for powdery white sand, turquoise water and its Blue Flag eco certification.' }
    ],
    inc: [
      'Accommodation in air conditioned room on double sharing basis.',
      'Meals: daily breakfast only.',
      'All transfers and sightseeing by private air conditioned cab, point to point only.',
      'To and fro ticket to Havelock by air conditioned cruise: Makruzz, Nautika, Green Ocean or ITT Majestic.',
      'Entry to Cellular Jail and the Light and Sound show.',
      'All entry, monument, parking and permit charges as per itinerary.',
      'Meet and assist at all arrival and departure points by a professional local tour manager.',
      '2 to 4 pax: Maruti Ertiga or similar, one cab. 5 to 6 pax: Maruti Ertiga, Mahindra Scorpio, Tavera or Mahindra Xylo, one cab. Additional cab during airport and harbour transfers.'
    ],
    exc: ['Airfare.', 'Cost of services which is not mentioned in the inclusions.', 'Meals other than those listed.'],
    notes: [
      'The above itinerary is subject to weather conditions and may change as per convenience and ferry timings.',
      'Being an island, the vehicle is on a point to point basis only, as per the shared itinerary.',
      'Child above 2 years and below 5 years at INR 6,500 for ferry charges, applicable.',
      'Child below 2 years complimentary, without a mattress.'
    ],
    cancel: ['30 percent before 60 days of check in.', '55 percent before 45 days of check in.', '80 percent before 30 days of check in.', '100 percent within 30 days from the date of departure.'],
    pay: ['100 percent of the flight cost.', '50 percent of the package amount at the time of booking.', '100 percent before 25 days of the travelling date.']
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
