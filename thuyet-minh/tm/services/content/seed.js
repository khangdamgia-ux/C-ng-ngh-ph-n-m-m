// Dữ liệu mẫu: các địa điểm tại TP.HCM. Giờ mở cửa chỉ mang tính tham khảo.
const L = (vi, en, ja, ko) => {
  const tr = { vi: { title: vi[0], body: vi[1] }, en: { title: en[0], body: en[1] } };
  if (ja) tr.ja = { title: ja[0], body: ja[1] };
  if (ko) tr.ko = { title: ko[0], body: ko[1] };
  return tr;
};

const places = [
  { meta: { category: 'food', emoji: '🛍️', address: 'Đường Lê Lợi, phường Bến Thành', lat: 10.7725, lng: 106.698, hours: '6:00 – 18:00 (chợ đêm từ 18:00)', year: '1914' },
    tr: L(['Chợ Bến Thành', 'Chợ Bến Thành là biểu tượng của Thành phố Hồ Chí Minh, khánh thành năm 1914. Nơi đây bán đủ loại hàng hóa và ẩm thực địa phương. Tháp đồng hồ ở cổng phía Nam là điểm hẹn quen thuộc của người dân và du khách. Bạn nên thử các quầy chè, bún mắm và cà phê sữa đá bên trong chợ.'],
      ['Ben Thanh Market', 'Ben Thanh Market is an icon of Ho Chi Minh City, opened in 1914. It sells all kinds of goods and local food. The clock tower above the south gate is a classic meeting point for locals and visitors. Try the sweet soup stalls, fermented-fish noodles and iced milk coffee inside.'],
      ['ベンタイン市場', 'ベンタイン市場はホーチミン市の象徴で、1914年に開業しました。さまざまな商品や地元料理が楽しめます。南門の時計塔は待ち合わせの定番スポットです。'],
      ['벤탄 시장', '벤탄 시장은 1914년에 문을 연 호찌민시의 상징입니다. 다양한 상품과 현지 음식을 만날 수 있습니다. 남문의 시계탑은 약속 장소로 인기가 많습니다.']) },
  { meta: { category: 'history', emoji: '🏛️', address: '135 Nam Kỳ Khởi Nghĩa', lat: 10.777, lng: 106.6955, hours: '7:30 – 16:00', year: '1966' },
    tr: L(['Dinh Độc Lập', 'Dinh Độc Lập là nơi diễn ra sự kiện lịch sử ngày 30/4/1975. Công trình nay là di tích quốc gia đặc biệt. Bên trong còn giữ nguyên phòng họp nội các, phòng khánh tiết và hầm chỉ huy dưới lòng đất. Kiến trúc hiện đại những năm 1960 do kiến trúc sư Ngô Viết Thụ thiết kế.'],
      ['Independence Palace', 'Independence Palace is where the historic events of 30 April 1975 took place. It is now a special national monument. Inside you can see the cabinet room, the reception hall and the underground command bunker. The 1960s modernist building was designed by architect Ngo Viet Thu.']) },
  { meta: { category: 'religion', emoji: '⛪', address: '01 Công xã Paris', lat: 10.7798, lng: 106.699, hours: 'Tham quan bên ngoài; giờ lễ theo thông báo', year: '1880' },
    tr: L(['Nhà thờ Đức Bà', 'Nhà thờ Đức Bà Sài Gòn được xây bằng gạch đỏ nhập từ Pháp, hoàn thành năm 1880. Hai tháp chuông cao khoảng 58 mét là nét đặc trưng của khu trung tâm. Trước nhà thờ là tượng Đức Mẹ Hòa Bình. Nhà thờ có thể đang trong giai đoạn trùng tu nên hãy kiểm tra trước khi vào tham quan.'],
      ['Notre-Dame Cathedral', 'Saigon Notre-Dame Cathedral was built with red bricks imported from France and completed in 1880. Its twin bell towers, about 58 metres tall, define the city centre skyline. A statue of Our Lady of Peace stands in front. Parts may be under restoration, so check before you visit.'],
      ['聖母マリア教会', 'サイゴン大教会はフランスから輸入した赤レンガで造られ、1880年に完成しました。高さ約58メートルの2つの鐘楼が街の象徴です。'],
      ['사이공 노트르담 대성당', '사이공 노트르담 대성당은 프랑스에서 들여온 붉은 벽돌로 지어져 1880년에 완공되었습니다. 약 58미터 높이의 두 종탑이 도심의 상징입니다.']) },
  { meta: { category: 'history', emoji: '📮', address: '02 Công xã Paris', lat: 10.7799, lng: 106.7, hours: '7:00 – 19:00', year: '1891' },
    tr: L(['Bưu điện Trung tâm Sài Gòn', 'Bưu điện Trung tâm xây dựng từ năm 1886 đến 1891 theo phong cách Pháp. Nhiều người tin công trình do Gustave Eiffel thiết kế, nhưng thực tế do kiến trúc sư Alfred Foulhoux thực hiện. Sảnh chính có mái vòm sắt, bản đồ cổ vẽ tay và vẫn hoạt động như một bưu cục thực thụ.'],
      ['Saigon Central Post Office', 'The Central Post Office was built between 1886 and 1891 in French style. Many believe Gustave Eiffel designed it, but it was actually the work of architect Alfred Foulhoux. The main hall has an iron-vaulted ceiling and old hand-painted maps, and it still works as a real post office.'],
      ['サイゴン中央郵便局', 'サイゴン中央郵便局は1886年から1891年にかけて建てられたフランス様式の建物です。今も現役の郵便局として使われています。'],
      ['사이공 중앙우체국', '사이공 중앙우체국은 1886년부터 1891년까지 지어진 프랑스풍 건물로, 지금도 실제 우체국으로 운영되고 있습니다.']) },
  { meta: { category: 'culture', emoji: '🕊️', address: '28 Võ Văn Tần', lat: 10.7794, lng: 106.6922, hours: '7:30 – 17:30', year: '1975' },
    tr: L(['Bảo tàng Chứng tích Chiến tranh', 'Bảo tàng thành lập năm 1975, trưng bày hình ảnh, hiện vật và xe quân sự về cuộc chiến tranh Việt Nam. Đây là một trong những bảo tàng được tham quan nhiều nhất thành phố. Một số hình ảnh khá nặng nề, hãy cân nhắc khi đi cùng trẻ nhỏ.'],
      ['War Remnants Museum', 'Founded in 1975, the museum displays photographs, artefacts and military vehicles from the Vietnam War. It is among the most visited museums in the city. Some images are very heavy, so consider this if you bring young children.']) },
  { meta: { category: 'history', emoji: '🕳️', address: 'Huyện Củ Chi, cách trung tâm khoảng 70 km', lat: 11.1428, lng: 106.4627, hours: '7:00 – 17:00', year: '1948' },
    tr: L(['Địa đạo Củ Chi', 'Hệ thống địa đạo Củ Chi dài hơn 200 km, được đào từ thập niên 1940 và mở rộng trong chiến tranh. Bên trong có hầm họp, bếp Hoàng Cầm, kho vũ khí và nơi cứu thương. Du khách có thể chui thử một đoạn hầm đã được nới rộng và nếm món khoai mì chấm muối mè.'],
      ['Cu Chi Tunnels', 'The Cu Chi tunnel network stretches more than 200 km. It was dug from the 1940s and expanded during the war. Inside are meeting rooms, a smokeless kitchen, weapon stores and field clinics. Visitors can crawl through a widened section and taste tapioca with sesame salt.']) },
  { meta: { category: 'culture', emoji: '🚶', address: 'Đường Nguyễn Huệ', lat: 10.7745, lng: 106.704, hours: 'Cả ngày, sôi động nhất buổi tối', year: '2015' },
    tr: L(['Phố đi bộ Nguyễn Huệ', 'Phố đi bộ Nguyễn Huệ dài khoảng 670 mét, mở cửa năm 2015, nối Ủy ban Nhân dân Thành phố với bến Bạch Đằng. Đây là nơi diễn ra các lễ hội, biểu diễn đường phố và đếm ngược năm mới. Hai bên là những quán cà phê trong các chung cư cũ rất được yêu thích.'],
      ['Nguyen Hue Walking Street', 'Nguyen Hue Walking Street is about 670 metres long and opened in 2015, linking the City Hall with the Bach Dang riverside. It hosts festivals, street performances and New Year countdowns. Old apartment blocks on both sides hide popular cafés.']) },
  { meta: { category: 'culture', emoji: '🏙️', address: '720A Điện Biên Phủ', lat: 10.7951, lng: 106.7218, hours: 'Đài quan sát SkyView: 9:30 – 22:00', year: '2018' },
    tr: L(['Landmark 81', 'Landmark 81 cao 461,3 mét, hoàn thành năm 2018 và khi đó là tòa nhà cao nhất Đông Nam Á. Đài quan sát SkyView ở tầng 79 đến 81 cho tầm nhìn toàn cảnh sông Sài Gòn và thành phố, đẹp nhất lúc hoàng hôn.'],
      ['Landmark 81', 'Landmark 81 is 461.3 metres tall and was completed in 2018, then the tallest building in Southeast Asia. The SkyView observation deck on floors 79 to 81 offers a panorama of the Saigon River and the city, best at sunset.'],
      ['ランドマーク81', 'ランドマーク81は高さ461.3メートル、2018年に完成し、当時は東南アジアで最も高い建物でした。展望台からはサイゴン川と街を一望できます。'],
      ['랜드마크 81', '랜드마크 81은 높이 461.3미터로 2018년에 완공되어 당시 동남아시아에서 가장 높은 건물이었습니다. 전망대에서 사이공강과 도시를 한눈에 볼 수 있습니다.']) },
  { meta: { category: 'religion', emoji: '🏮', address: '73 Mai Thị Lựu', lat: 10.7895, lng: 106.6983, hours: '7:00 – 18:00', year: '1909' },
    tr: L(['Chùa Ngọc Hoàng', 'Chùa Ngọc Hoàng còn gọi là chùa Phước Hải, xây năm 1909 bởi cộng đồng người Hoa. Trong chùa thờ Ngọc Hoàng Thượng đế cùng nhiều tượng gỗ, giấy bồi sinh động. Không khí hương trầm đặc quánh và những vòng hương treo cao tạo nên nét rất riêng.'],
      ['Jade Emperor Pagoda', 'The Jade Emperor Pagoda, also called Phuoc Hai, was built in 1909 by the Chinese community. It honours the Jade Emperor and holds many vivid wooden and papier-mâché statues. Thick incense smoke and hanging spiral coils give it a distinctive atmosphere.']) },
  { meta: { category: 'religion', emoji: '🙏', address: '710 Nguyễn Trãi, khu Chợ Lớn', lat: 10.7523, lng: 106.661, hours: '6:00 – 17:00' },
    tr: L(['Chùa Bà Thiên Hậu', 'Chùa Bà Thiên Hậu là ngôi chùa người Hoa lâu đời ở Chợ Lớn, thờ Thiên Hậu Thánh Mẫu, vị nữ thần che chở người đi biển. Những vòng hương xoắn khổng lồ treo dưới mái ngói là hình ảnh nổi bật nhất. Nên kết hợp dạo Chợ Lớn và thưởng thức ẩm thực Hoa trong khu vực.'],
      ['Thien Hau Temple', 'Thien Hau Temple is an old Chinese temple in Cho Lon dedicated to Thien Hau, goddess protector of seafarers. Giant spiral incense coils hanging under the tiled roof are its signature sight. Combine it with a stroll through Cho Lon and its Chinese-Vietnamese food.']) },
  { meta: { category: 'culture', emoji: '🎨', address: '97A Phó Đức Chính', lat: 10.7696, lng: 106.6993, hours: '9:00 – 17:00', year: '1929' },
    tr: L(['Bảo tàng Mỹ thuật TP.HCM', 'Bảo tàng đặt trong ngôi biệt thự xây năm 1929 của gia đình Hứa Bổn Hòa, pha trộn kiến trúc Pháp và Á Đông. Nơi đây trưng bày tranh sơn mài, điêu khắc và mỹ thuật cổ của Việt Nam, kể cả các tác phẩm của thời Óc Eo – Champa.'],
      ['Ho Chi Minh City Fine Arts Museum', 'The museum occupies a villa built in 1929 for the Hua Bon Hoa family, blending French and Asian architecture. It shows Vietnamese lacquer paintings, sculpture and ancient art, including works from the Oc Eo and Champa eras.']) },
  { meta: { category: 'nature', emoji: '🌳', address: '2 Nguyễn Bỉnh Khiêm', lat: 10.7875, lng: 106.7054, hours: '7:00 – 18:00', year: '1864' },
    tr: L(['Thảo Cầm Viên Sài Gòn', 'Thảo Cầm Viên thành lập năm 1864, là một trong những vườn thú lâu đời nhất thế giới. Khuôn viên rộng với nhiều cây cổ thụ, hồ nước và bảo tàng lịch sử. Đây là điểm đi dạo yên tĩnh giữa trung tâm, thích hợp cho gia đình có trẻ nhỏ.'],
      ['Saigon Zoo and Botanical Garden', 'Founded in 1864, the Saigon Zoo and Botanical Garden is one of the oldest zoos in the world. Its wide grounds have old trees, lakes and a history museum. It is a quiet escape in the city centre, good for families with young children.']) },
  { meta: { category: 'history', emoji: '⚓', address: '1 Nguyễn Tất Thành', lat: 10.7677, lng: 106.7066, hours: '7:30 – 17:00', year: '1863' },
    tr: L(['Bến Nhà Rồng', 'Bến Nhà Rồng là nơi ngày 5/6/1911 người thanh niên Nguyễn Tất Thành lên tàu ra đi tìm đường cứu nước. Tòa nhà xây năm 1863 hiện là Bảo tàng Hồ Chí Minh – chi nhánh TP.HCM. Mái nhà có hai con rồng lớn nên người dân gọi là Nhà Rồng.'],
      ['Nha Rong Wharf', 'Nha Rong Wharf is where, on 5 June 1911, the young Nguyen Tat Thanh boarded a ship to seek a path for his country. The building, completed in 1863, is now the Ho Chi Minh Museum branch in the city. Two large dragons on its roof gave it the name Nha Rong, the Dragon House.']) },
  { meta: { category: 'culture', emoji: '🎶', address: 'Phố Bùi Viện', lat: 10.7676, lng: 106.6934, hours: 'Sôi động từ 19:00 đến khuya' },
    tr: L(['Phố Tây Bùi Viện', 'Phố Bùi Viện là khu phố đi bộ về đêm nổi tiếng với quán bar, nhà hàng và nhạc sống. Ban ngày yên tĩnh hơn với những quán cà phê và tiệm massage. Đây là nơi gặp gỡ của du khách khắp thế giới.'],
      ['Bui Vien Walking Street', 'Bui Vien is a nightlife street known for bars, restaurants and live music. By day it is calmer, with cafés and massage shops. It is a meeting point for travellers from all over the world.']) },
  { meta: { category: 'food', emoji: '🍢', address: 'Đường Vĩnh Khánh', lat: 10.7615, lng: 106.7035, hours: 'Từ 17:00 đến khuya' },
    tr: L(['Phố ẩm thực Vĩnh Khánh', 'Đường Vĩnh Khánh nổi tiếng với dãy quán ốc và hải sản bình dân, đông nhất vào buổi tối. Bạn có thể thử ốc xào bơ tỏi, sò điệp nướng mỡ hành và các món nướng. Nên đi theo nhóm để gọi được nhiều món.'],
      ['Vinh Khanh Food Street', 'Vinh Khanh Street is known for its rows of casual snail and seafood restaurants, busiest in the evening. Try snails in garlic butter, grilled scallops with scallion oil and barbecue dishes. Go in a group so you can order many dishes.']) }
];

export const seed = () => ({
  langs: [
    { code: 'vi', name: 'Tiếng Việt', tts: 'vi-VN' },
    { code: 'en', name: 'Tiếng Anh', tts: 'en-US' },
    { code: 'ja', name: 'Tiếng Nhật', tts: 'ja-JP' },
    { code: 'ko', name: 'Tiếng Hàn', tts: 'ko-KR' }
  ],
  nid: places.length + 1,
  contents: places.map((p, i) => ({ id: i + 1, tr: p.tr, meta: p.meta }))
});
