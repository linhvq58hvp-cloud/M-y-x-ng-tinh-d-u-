import { ScentItem, SpaceItem, ReviewItem, FaqItem, ProductColor } from '../types';

export const BRAND_INFO = {
  name: 'Nova Privée',
  model: 'Apex One Luxury Edition',
  tagline: 'Thơm Tinh Tế • Vận Hành Êm Ái • Thiết Kế Sang Trọng',
  subtitle: 'Biến mọi không gian thành một nơi dễ chịu hơn với hương thơm tinh dầu lan tỏa nhẹ nhàng, thuần khiết và tĩnh lặng.',
  logoUrl: '',
  heroImageUrl: '/slides/hero-primary.png',
  heroImageFallback: 'https://i.postimg.cc/RV8Y1TB4/Chat-GPT-Image-13-50-59-12-thg-9-2026.png',
  
  // Pricing
  originalPrice: 1850000,
  salePrice: 1290000,
  savings: 560000,
  warrantyMonths: 12,
  freeOilVolume: '10ml',
  
  // Contacts
  hotline: '094.222.3434',
  phoneDirect: '094.222.3434',
  zalo: '094.222.3434',
  showroom: 'KĐT Dương Nội, Hà Đông, Hà Nội',

  // Banking Details & QR Code
  bankInfo: {
    bankName: 'Techcombank (Hà Nội)',
    accountNumber: '90222222222',
    accountHolder: 'VŨ QUANG LINH',
    qrCodeUrl: '/qr-code.jpg',
    qrCodeFallback: 'https://i.postimg.cc/KY8G0TqN/1789268981570-1572866617261527986-2420771707387899129-89c7f35e4965341ebef63878166bf3c5.jpg'
  },

  // Marketing & Analytics
  metaPixelId: '1779206996550900', // Meta Pixel ID chính thức mới

  // Google Sheets Webhook Integration
  googleSheetScriptUrl: 'https://script.google.com/macros/s/AKfycbzUxh_ymDeZRulH8q1wsFYl7PejGP3lNzgWeO835dfVXvl7AHOAj8FmMFwplkOfXqQc/exec'
};

export interface HeroSlideItem {
  id: string;
  url: string;
  fallbackUrl: string;
  alt: string;
  title: string;
  tag: string;
  isVideo?: boolean;
  videoUrl?: string;
  videoFallbackUrl?: string;
  durationMs?: number;
}

export const HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 'slide-video-smoke',
    url: '/slides/hero-primary.png',
    fallbackUrl: 'https://i.postimg.cc/RV8Y1TB4/Chat-GPT-Image-13-50-59-12-thg-9-2026.png',
    isVideo: true,
    videoUrl: '/slides/hero-smoke.mp4',
    videoFallbackUrl: 'https://files.catbox.moe/c1fnhx.mp4',
    alt: 'Video khói sương bốc lên từ máy khuếch tán Nova Privée Apex One',
    title: 'Làn Khói Sương Êm Ái',
    tag: 'Video 4K',
    durationMs: 8000 // Display longer for the smoke video (8 seconds)
  },
  {
    id: 'slide-0-primary',
    url: '/slides/hero-primary.png',
    fallbackUrl: 'https://i.postimg.cc/RV8Y1TB4/Chat-GPT-Image-13-50-59-12-thg-9-2026.png',
    alt: 'Máy khuếch tán tinh dầu cao cấp Nova Privée Apex One',
    title: 'Nova Privée Apex One',
    tag: 'Kiệt tác'
  },
  {
    id: 'slide-1',
    url: '/slides/slide1.png',
    fallbackUrl: 'https://i.postimg.cc/SK056Rkg/Chat-GPT-Image-16-26-34-10-thg-9-2026.png',
    alt: 'Công nghệ khuếch tán thông minh Apex One',
    title: 'Công Nghệ Thông Minh',
    tag: 'Đồng bộ xe'
  },
  {
    id: 'slide-2',
    url: '/slides/slide2.png',
    fallbackUrl: 'https://i.postimg.cc/PqGcWJT2/Chat-GPT-Image-16-28-13-10-thg-9-2026.png',
    alt: 'Thiết kế kim loại tinh xảo kiệt tác Nova Privée',
    title: 'Hợp Kim Hàng Không',
    tag: 'Thiết kế cao cấp'
  },
  {
    id: 'slide-3',
    url: '/slides/slide3.png',
    fallbackUrl: 'https://i.postimg.cc/d0MX23wW/Chat-GPT-Image-16-29-53-10-thg-9-2026.png',
    alt: '3 mức độ khuếch tán linh hoạt',
    title: '3 Mức Độ Khuếch Tán',
    tag: 'Tiết kiệm tinh dầu'
  },
  {
    id: 'slide-4',
    url: '/slides/slide4.png',
    fallbackUrl: 'https://i.postimg.cc/Hk8R8XDb/Chat-GPT-Image-16-31-20-10-thg-9-2026.png',
    alt: 'Thời lượng pin lên đến 60 giờ',
    title: 'Pin 2000mAh 60h',
    tag: 'Sạc Type-C'
  },
  {
    id: 'slide-5',
    url: '/slides/slide5.png',
    fallbackUrl: 'https://i.postimg.cc/T3H2frjQ/04a33746-4ee1-4043-8810-777dbb67a057.png',
    alt: 'Khuếch tán 02 lưu chất lan tỏa 360 độ',
    title: 'Lan Tỏa 360°',
    tag: 'Công nghệ 02 lưu chất'
  }
];

export const PRODUCT_COLORS: ProductColor[] = [
  {
    id: 'gray',
    name: 'Xám Titan (Space Gray)',
    hex: '#5c5c60',
    accent: '#c5a059'
  },
  {
    id: 'black',
    name: 'Đen Nhám (Obsidian Black)',
    hex: '#1f1f21',
    accent: '#c5a059'
  },
  {
    id: 'silver',
    name: 'Bạc Ánh Kim (Silver Chrome)',
    hex: '#d5d7dc',
    accent: '#131313'
  },
  {
    id: 'purple',
    name: 'Tím Khói (Mystic Purple)',
    hex: '#6b5876',
    accent: '#e9c176'
  },
  {
    id: 'gold',
    name: 'Vàng Đồng (Champagne Gold)',
    hex: '#c5a059',
    accent: '#e9c176'
  }
];

export const SCENT_COLLECTION: ScentItem[] = [
  {
    id: 'citrus',
    name: 'CITRUS',
    vietnameseName: 'Cam Chanh Tươi',
    tag: 'Năng Lượng',
    mood: 'Tươi mát • Sạch sẽ • Tràn đầy sinh khí hứng khởi',
    description: 'Bản hòa ca sảng khoái đánh thức các giác quan từ vỏ bưởi hồng Pomelo, cam Bergamot Ý và lá sả chanh mát lành.',
    suitableFor: 'Phòng khách • Văn phòng • Cửa hàng',
    topNotes: ['Cam Bergamot Calabria', 'Chanh Vàng Eureka', 'Bưởi Hồng'],
    heartNotes: ['Hoa Cam Neroli', 'Lá Sả Ceylon', 'Cỏ Roi Ngựa'],
    baseNotes: ['Gỗ Tuyết Tùng Nhẹ', 'Xạ Hương Trắng'],
    color: '#E9C349'
  },
  {
    id: 'fresh',
    name: 'FRESH',
    vietnameseName: 'Thảo Mộc Xanh',
    tag: 'An Dịu',
    mood: 'Thanh mát • Nhẹ nhàng • Dễ chịu và thông thoáng khí',
    description: 'Hơi thở trong trẻo như làn gió sớm mai len lỏi qua cánh rừng bách tùng Tây Bắc, làm sạch và thanh lọc không khí.',
    suitableFor: 'Phòng ngủ • Phòng làm việc',
    topNotes: ['Khuynh Diệp Úc', 'Bạc Hà Dại', 'Hương Thảo'],
    heartNotes: ['Lá Xô Thơm Clary', 'Tràm Trà', 'Oải Hương Pháp'],
    baseNotes: ['Gỗ Thông Đỏ', 'Rêu Rừng'],
    color: '#7EA682'
  },
  {
    id: 'floral',
    name: 'FLORAL',
    vietnameseName: 'Hoa Thanh Lịch',
    tag: 'Tinh Tế',
    mood: 'Tinh tế • Dịu dàng • Sang trọng và quý phái',
    description: 'Hương thơm mềm mại, sang trọng của những đóa mẫu đơn trắng kết hợp nhài sambac và ngọc lan tây thuần khiết.',
    suitableFor: 'Spa • Salon • Phòng ngủ master',
    topNotes: ['Quả Lê Anh Quốc', 'Cánh Hoa Sen Tuyết'],
    heartNotes: ['Mẫu Đơn Trắng', 'Nhài Sambac Grasse', 'Ngọc Lan Tây'],
    baseNotes: ['Hổ Phách Sữa', 'Cashmere Mềm Mại'],
    color: '#D4A5A5'
  },
  {
    id: 'woody',
    name: 'WOODY',
    vietnameseName: 'Gỗ Trầm Ấm',
    tag: 'Đẳng Cấp',
    mood: 'Ấm áp • Trầm lắng • Cao cấp và bí ẩn',
    description: 'Chiều sâu tĩnh tại từ gỗ đàn hương Mysore hòa quyện tuyết tùng Virginia, khơi gợi cảm giác an yên, vững chãi.',
    suitableFor: 'Khách sạn • Showroom • Phòng khách',
    topNotes: ['Bạch Đậu Khấu', 'Tiêu Hồng Madagasca'],
    heartNotes: ['Gỗ Tuyết Tùng Virginia', 'Trầm Hương Khói Nhẹ'],
    baseNotes: ['Đàn Hương Mysore', 'Vetiver Cỏ Hương Bài', 'Hổ Phách'],
    color: '#C5A059'
  },
  {
    id: 'luxury',
    name: 'LUXURY',
    vietnameseName: 'Hương Thượng Lưu',
    tag: 'Độc Bản',
    mood: 'Quyến rũ • Tinh xảo • Khác biệt và sâu lắng',
    description: 'Công thức hương độc quyền mang dấu ấn của các khách sạn 5 sao quốc tế, để lại ấn tượng khó phai với bất kỳ ai ghé thăm.',
    suitableFor: 'Spa cao cấp • Boutique • Khách sạn 5 sao • Biệt thự',
    topNotes: ['Lựu Đỏ Thổ Nhĩ Kỳ', 'Lá Trà Đen Darjeeling'],
    heartNotes: ['Hoa Hồng Damask', 'Gỗ Guaiacwood Nam Mỹ'],
    baseNotes: ['Vanilla Bourbon', 'Xạ Hương Hoàng Gia', 'Trầm Hương'],
    color: '#D4AF37'
  }
];

export const SPACES_LIST: SpaceItem[] = [
  {
    id: 'living-room',
    number: '01',
    title: 'Phòng Khách',
    description: 'Tạo cảm giác sạch sẽ, sang trọng và dễ chịu ngay khi khách quý bước vào nhà.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvA_e1YPrt2Dsy6xFeMRSL92PP7Z3H5ZEXOYH1_N66YwGn0Lk-gg98hg4UBvhttJsdp-YwABRHt8Dx0s-bPZ4RpR3o8r7JBAe_YPlfmFTTeBhoFu0wgeFIxciondJiXW6riaUiMYJy955bIIzrZ7ZIG-oNt2m29EG2wdf-dZd44qX1ZSff5-8E-lq1eIP67NH7QrE_rLHZOcq3YUXiuUIbHg3w9XkcEOc1bGMStIQkbGoV6SA0raQzPg',
    suggestedScent: 'Woody hoặc Citrus'
  },
  {
    id: 'bedroom',
    number: '02',
    title: 'Phòng Ngủ',
    description: 'Không gian thư giãn sâu lắng cùng những làn hương thảo mộc nhẹ dịu cho giấc ngủ an yên.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9iI1b-01Int4wG5FoRBh_uAodfkasD5YddtLecXFDf7dYB3zw1IZ1K-hQ4wX3n7MFx5ySyRfmkS2cxu20dmwn6nIL8t7NzG2cV3gsw6fyXmMF9umULc0UnRV-kEt0SZORL1AAJ-rKVVnk7KMtJbR5yMoRUYcpskaFq7Fq_616hGj1pRfPqsxzPY-rLm0zIij8yR6r0PY2M1sYg91C1VP71f0C5aGZ2dwM1b2ackBmsFoGJ4aolV6z4w',
    suggestedScent: 'Fresh hoặc Floral'
  },
  {
    id: 'office',
    number: '03',
    title: 'Văn Phòng',
    description: 'Tạo bầu không khí tập trung, kích thích tư duy sáng tạo và giải tỏa áp lực làm việc.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYc1fl6AcodRfpXVDKAeXsTHci7ojxOXiSxGur6_qIhY5csfxQoyBFaxAz0TSI7snAEDzENye4fYOYyHKEsp1s_jdmNk4QQGgMHdYEGk1gQLjaSJ2n4eggtEN95Hx1uEIRN_19p7IbvWNdXHC8JBAbSRvK9DOWkd2GuOXELBRx-TE4ZNYsvCnqudMg7Y86jK1YYm9cptIcj7C4BxNm9GhGuqZukra3Yu2gMdmXCESldXUAveJf0UJaQw',
    suggestedScent: 'Citrus hoặc Fresh'
  },
  {
    id: 'spa',
    number: '04',
    title: 'Spa & Salon',
    description: 'Tạo trải nghiệm thư giãn đẳng cấp ngay từ khoảnh khắc khách bước chân qua ngưỡng cửa.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY0rYHZiecdUQUezxaCKG9uo8T1ZKefVM2uhO2e78JJA_8PFOwr7RE7zeraky9hDMdRyfK7CiYugTJvz40O04C4j96Ysi8MuTn1F8H31RUlrUeE-5XZUZF09IvBVahE7osNqmd9CFGCTlTCdPTxF1fky0Jc-wjkUc-F9W25otSDzfwDBI66Lp_0HE7WieN9HhuiOmpetZ6PEmMgW9Pt_iLQYwSfxJwQ5eoPrMIzG6P_kjcwN8QS3zJtg',
    suggestedScent: 'Floral hoặc Luxury'
  },
  {
    id: 'showroom',
    number: '05',
    title: 'Shop & Showroom',
    description: 'Xây dựng dấu ấn khứu giác thương hiệu độc bản (Scent Branding) giữ chân khách hàng lâu hơn.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_93ZW3uUQNyCKpc7HdYUjCemDv0A7dB8QeoW9I3ho3hQY-sXgGwKZgFGF8Jx8J8gdNbRRNLbIxiZFyWK11xxOBs3JY9puBZ_BFrEbCvKs4ReHX9NuR8GkJQ5dYHPETMVLAQ-hMU4ZpxxG2b0vsKL1jbP-aRtDWPiIRHYrvpJiukXicbcJw6tFuhQla6fhu5QGhV8KXSr3-OyBYjYA0UE5S6QGCouIDrhZua6rqXkA-95Ht5xSKqlZ6Q',
    suggestedScent: 'Luxury hoặc Woody'
  },
  {
    id: 'hotel',
    number: '06',
    title: 'Khách Sạn & Homestay',
    description: 'Tạo cảm giác đón tiếp chỉn chu, chuyên nghiệp và khẳng định chuẩn mực cao cấp.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKdySgxqmGTIIt_jjsjeajWsrw1NGBky4OOidU7ksr2kPBo6o0rhTNn46oWZpq2bEmjk5x9JQtOPsATTTtmyTT3dTfa6_GePpENtJoMyNMs5Apu4ae48EtWDwhlii4QOFVNPMfOZA22emXq2PzE2hKC77wqup-IH2EtRahw0e58TO4lHO0Tbj_kyMNff1jxgeJ7W6pdjcSvyYatFTPSlXkvl_TP4FNzEX3hNAVH_CdX25clCzr3lGnGQ',
    suggestedScent: 'Luxury'
  },
  {
    id: 'car',
    number: '07',
    title: 'Xe Hơi & Ô Tô Cao Cấp',
    description: 'Khử mùi da xe mới, ẩm mốc điều hòa, kiến tạo khoang lái thơm dịu thư thái và duy trì sự tỉnh táo suốt hành trình.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA63it9IfovJP3-VR1fVNJMAbHenHWzPTmjV81FAx0BqHnqIcoYPz8gCLcT-VY5A2ml0la92dX8DsIMJrjL6yAfoPqANINd5hH0S5uaUHoytwEtYp7UdUGyz1bsd4xReItqWWphEKDIv4fmlS7vBEORyj831An7KXhPBkMcp0IF42wtGZI99in4hN6yvCZxdgzUJuHqHj38SK_1BiF5Un2E-NgPNz-pOKWEtwn5vATuoyosvo1tv5e11A',
    suggestedScent: 'Fresh hoặc Citrus'
  }
];

export const COMPARISON_ROWS = [
  { feature: 'Hương thơm ổn định liên tục', diffuser: true, spray: false, candle: 'Chỉ khi thắp' },
  { feature: 'Tự động vận hành theo lịch', diffuser: true, spray: false, candle: false },
  { feature: 'Điều chỉnh cường độ khuếch tán', diffuser: true, spray: false, candle: false },
  { feature: 'Hẹn giờ & chu kỳ phun thông minh', diffuser: true, spray: false, candle: false },
  { feature: 'Thiết kế trang trí nội thất', diffuser: true, spray: false, candle: true },
  { feature: 'An toàn tuyệt đối, không nhiệt', diffuser: true, spray: 'Chứa cồn & aerosol', candle: 'Nguy cơ hỏa hoạn' },
  { feature: 'Phù hợp không gian kinh doanh / gia đình', diffuser: true, spray: 'Tạm bợ', candle: 'Hạn chế' },
  { feature: 'Tạo mùi đặc trưng nhận diện (Scent Branding)', diffuser: true, spray: false, candle: false }
];

export const TECH_SPECS = [
  { label: 'Phương pháp phun sương', value: 'Phun sương hai chất lỏng (Two-fluid Cold Atomization)' },
  { label: 'Diện tích phủ sóng', value: '30m³' },
  { label: 'Công suất hoạt động', value: '1W' },
  { label: 'Dung tích bình chứa', value: '10ml' },
  { label: 'Độ ồn vận hành', value: '< 30 dBa' },
  { label: 'Chất liệu thân máy', value: 'Hợp kim nhôm' },
  { label: 'Trọng lượng', value: '0,3 kg' },
  { label: 'Trọng lượng sản phẩm', value: '0,35 kg (350g)' },
  { label: 'Màu sắc', value: 'Xám, Đen, Bạc, Tím, Vàng' },
  { label: 'Kích thước sản phẩm', value: '71 * 136 mm' },
  { label: 'Kích thước đóng gói (Hộp đơn)', value: '71 * 71 * 136 mm' },
  { label: 'Kích thước đóng gói (Thùng)', value: '430 * 430 * 350 mm' },
  { label: 'Chế độ bảo hành', value: '12 tháng chính hãng (1 đổi 1 trong 30 ngày)' }
];

export const REVIEWS_LIST: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Anh Trần Minh Tuấn',
    location: 'Quận 1, TP. Hồ Chí Minh',
    rating: 5,
    date: '3 ngày trước',
    content: 'Máy thiết kế rất đẹp và sang trọng, vỏ nhôm cầm đầm tay. Mình để ở phòng khách chung cư 55m² chỉ 5 phút là hương gỗ Woody lan tỏa khắp nhà, ai đến chơi cũng khen mùi như sảnh Park Hyatt.',
    space: 'Phòng khách Penthouse',
    avatarLetter: 'T'
  },
  {
    id: 'rev-2',
    name: 'Chị Hoàng Thảo My',
    location: 'Cầu Giấy, Hà Nội',
    rating: 5,
    date: '1 tuần trước',
    content: 'Máy chạy êm kinh ngạc, để cạnh bàn trang điểm trong phòng ngủ mà không nghe tiếng rè hay nhỏ giọt nào. Mùi Fresh rất dễ chịu, giúp mình ngủ sâu giấc hơn hẳn sau những ngày họp căng thẳng.',
    space: 'Phòng ngủ Master',
    avatarLetter: 'M'
  },
  {
    id: 'rev-3',
    name: 'Bác sĩ Đặng Quốc Huy',
    location: 'Hải Châu, Đà Nẵng',
    rating: 5,
    date: '2 tuần trước',
    content: 'Mình mua 2 chiếc, một chiếc đặt phòng khám nha khoa thẩm mỹ, một chiếc để xe Mercedes GLC. Khách vào khen không gian chuyên nghiệp, còn trên xe thì hết hẳn mùi điều hòa khó chịu.',
    space: 'Phòng khám & Xe hơi',
    avatarLetter: 'H'
  },
  {
    id: 'rev-4',
    name: 'Chị Lê Phương Trinh',
    location: 'Thủ Thiêm, TP. Thủ Đức',
    rating: 5,
    date: '3 tuần trước',
    content: 'Giao hàng hỏa tốc trong ngày đóng gói siêu đẹp như quà tặng cao cấp. Được tặng kèm chai tinh dầu 50ml mùi Luxury thơm ngây ngất. Xứng đáng từng đồng bỏ ra!',
    space: 'Showroom thời trang',
    avatarLetter: 'P'
  },
  {
    id: 'rev-5',
    name: 'KTS. Nguyễn Bảo Long',
    location: 'Ba Đình, Hà Nội',
    rating: 5,
    date: '1 tháng trước',
    content: 'Dưới góc độ một kiến trúc sư nội thất, mình cực kỳ ấn tượng với tỷ lệ đường nét của máy. Tối giản, không có chi tiết thừa, bề mặt anodized sờ rất mịn. Đặt vào các căn hộ phong cách Wabi-Sabi hay Modern Luxury đều tôn thêm vẻ đẹp của căn phòng.',
    space: 'Studio Kiến Trúc',
    avatarLetter: 'L'
  },
  {
    id: 'rev-6',
    name: 'Doanh nhân Phạm Duy Khánh',
    location: 'Phú Mỹ Hưng, Quận 7, TP. HCM',
    rating: 5,
    date: '1 tháng trước',
    content: 'Đặt trên xe Porsche Macan rất vừa khít hộc để nước. Chạy cổng Type-C tiện lợi, lên xe mở 1 phút là khoang lái thơm mát mùi Citrus tỉnh táo, lái xe đường dài bớt mệt mỏi rất nhiều.',
    space: 'Xe hơi SUV',
    avatarLetter: 'K'
  },
  {
    id: 'rev-7',
    name: 'Chị Đỗ Thu Hà',
    location: 'Tây Hồ, Hà Nội',
    rating: 5,
    date: '1 tháng trước',
    content: 'Nhà mình nuôi 2 bé cún corgi nên thường xuyên có mùi lông động vật. Dùng máy Nova Privée với nốt hương Fresh thảo mộc khử mùi triệt để, không khí trong nhà thoáng đãng hẳn lên.',
    space: 'Căn hộ Duplex',
    avatarLetter: 'H'
  },
  {
    id: 'rev-8',
    name: 'Anh Vũ Đình Trọng',
    location: 'Hồng Bàng, Hải Phòng',
    rating: 5,
    date: '2 tháng trước',
    content: 'Bình 350ml dùng cả tuần mới phải châm nước và tinh dầu một lần. Remote đi kèm chỉnh các chế độ hẹn giờ rất tiện khi đang nằm trên giường đọc sách lười dậy bấm nút.',
    space: 'Phòng ngủ & Đọc sách',
    avatarLetter: 'T'
  },
  {
    id: 'rev-9',
    name: 'Chị Mai Lan Anh',
    location: 'Nha Trang, Khánh Hòa',
    rating: 5,
    date: '2 tháng trước',
    content: 'Spa của mình đặt 3 máy ở khu vực lễ tân và phòng trị liệu body. Khách hàng bước vào là khen thơm nức nở, hỏi xin tên hãng tinh dầu suốt. Rất ưng ý với dịch vụ hỗ trợ của Nova Privée.',
    space: 'Day Spa & Wellness',
    avatarLetter: 'L'
  },
  {
    id: 'rev-10',
    name: 'Anh Ngô Quang Vinh',
    location: 'Biên Hòa, Đồng Nai',
    rating: 5,
    date: '2 tháng trước',
    content: 'Mua làm quà tân gia cho sếp, sếp ưng ý vô cùng. Hộp quà đóng gói nơ lụa và thiệp viết tay đẳng cấp. Giao hàng hỏa tốc đóng gói cẩn thận 3 lớp bọc bong bóng.',
    space: 'Quà tặng tân gia',
    avatarLetter: 'V'
  },
  {
    id: 'rev-11',
    name: 'Chị Bùi Bích Phương',
    location: 'Quận 2, TP. Hồ Chí Minh',
    rating: 5,
    date: '3 tháng trước',
    content: 'Mùi Floral hoa mẫu đơn thanh lịch ngất ngây. Máy xông sương vi mô hạt cực nhỏ nên không hề làm ướt mặt bàn gỗ tự nhiên, dùng 3 tháng nay bàn ghế vẫn nguyên vẹn.',
    space: 'Phòng ngủ Master',
    avatarLetter: 'B'
  },
  {
    id: 'rev-12',
    name: 'Luật sư Lê Anh Đức',
    location: 'Hoàn Kiếm, Hà Nội',
    rating: 5,
    date: '3 tháng trước',
    content: 'Phòng làm việc tiếp khách của văn phòng luật sư mình luôn bật mùi Woody gỗ trầm. Khách hàng ngồi làm việc cảm thấy bình tĩnh, tin cậy và trang trọng hơn hẳn.',
    space: 'Văn phòng Luật',
    avatarLetter: 'Đ'
  }
];

export const FAQ_LIST: FaqItem[] = [
  {
    id: 1,
    question: 'Máy có phù hợp với phòng ngủ không?',
    answer: 'Có. Thiết bị được tối ưu độ ồn ở mức cực êm dưới 22dB, hoàn toàn thích hợp đặt đầu giường hoặc bàn làm việc mà không làm phiền giấc ngủ của bạn.'
  },
  {
    id: 2,
    question: 'Một lần đổ tinh dầu dùng được bao lâu?',
    answer: 'Với dung tích bình chứa 350ml và chế độ phun sương nano tiết kiệm, một lần đổ đầy bạn có thể sử dụng từ 7 đến 14 ngày tùy thuộc vào tần suất và cường độ phun bạn cài đặt.'
  },
  {
    id: 3,
    question: 'Có khó sử dụng không?',
    answer: 'Rất đơn giản, chỉ với 3 thao tác: Đổ tinh dầu vào bình chứa – Chọn chế độ hẹn giờ & nồng độ – Bật nút nguồn cảm ứng là máy sẽ tự động hoạt động thông minh.'
  },
  {
    id: 4,
    question: 'Sản phẩm bảo hành như thế nào?',
    answer: 'Sản phẩm được áp dụng chính sách bảo hành chính hãng 12 tháng, hỗ trợ 1 đổi 1 mới 100% trong vòng 30 ngày nếu phát sinh lỗi kỹ thuật từ nhà sản xuất.'
  },
  {
    id: 5,
    question: 'Có được kiểm tra hàng trước khi nhận không?',
    answer: 'Chắc chắn có. Quý khách được đồng kiểm kiện hàng, kiểm tra ngoại quan máy, phụ kiện và quà tặng đầy đủ trước khi thanh toán cho nhân viên giao hàng (áp dụng cho đơn COD).'
  },
  {
    id: 6,
    question: 'Dùng loại tinh dầu nào cho máy?',
    answer: 'Máy tương thích với mọi dòng tinh dầu nguyên chất hoặc tinh dầu chuyên dụng khuếch tán. Đặc biệt hôm nay bạn được TẶNG KÈM 50ML TINH DẦU HAUTE PARFUMERIE cao cấp tùy chọn khi đặt mua.'
  },
  {
    id: 7,
    question: 'Diện tích phòng bao nhiêu thì dùng tốt?',
    answer: 'Máy hoạt động tối ưu trong không gian từ 25m² đến 80m² (phòng khách, phòng ngủ, căn hộ chung cư, văn phòng, spa, showroom) và dễ dàng mang theo sử dụng trên xe ô tô.'
  },
  {
    id: 8,
    question: 'Máy có sử dụng được trên xe hơi / ô tô không?',
    answer: 'Hoàn toàn phù hợp. Với kích thước trụ thon gọn tiêu chuẩn và cổng nguồn Type-C đa năng, máy đặt vừa vặn vào hộc để ly hoặc taplo xe, khử sạch mùi xe mới và điều hòa ẩm mốc chỉ trong vài phút.'
  }
];
