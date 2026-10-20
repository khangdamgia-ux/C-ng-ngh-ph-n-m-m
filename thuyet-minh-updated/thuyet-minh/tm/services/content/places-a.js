// Địa điểm 1–8. Giờ mở cửa chỉ mang tính tham khảo.
import { L } from './lib.js';

export const placesA = [
  { meta: { category: 'food', emoji: '🛍️', address: 'Đường Lê Lợi, phường Bến Thành', lat: 10.7725, lng: 106.698, hours: '6:00 – 18:00 (chợ đêm từ 18:00)', year: '1914' },
    tr: L([`Chợ Bến Thành`, `Xin chào và chào mừng bạn đến với chợ Bến Thành, biểu tượng quen thuộc nhất của Thành phố Hồ Chí Minh.

Ngôi chợ hiện nay được xây dựng trong những năm đầu thế kỷ hai mươi và khánh thành năm 1914. Trước đó, chợ Bến Thành đã có từ rất sớm, họp ngay bên bờ sông Sài Gòn, nơi ghe thuyền tấp nập mua bán. Khi thành phố phát triển, chợ được dời về vị trí mới và xây thành một công trình kiên cố với mái ngói, cột sắt và các cổng lớn.

Điểm nhấn của chợ là tháp đồng hồ ở cổng phía Nam. Hình ảnh tháp đồng hồ đã gắn bó với người Sài Gòn hơn một thế kỷ, và là nơi hẹn hò, chụp ảnh quen thuộc của du khách.

Bên trong, chợ chia thành nhiều khu: vải vóc, quần áo, đồ lưu niệm, hàng thủ công, cà phê và gia vị. Bạn đừng quên mặc cả nhẹ nhàng, đó là một phần của văn hóa đi chợ. Khu ẩm thực ở giữa chợ phục vụ các món rất đặc trưng như bún mắm, bún thịt nướng, cơm tấm, chè và cà phê sữa đá.

Từ sau sáu giờ chiều, các con đường quanh chợ trở thành chợ đêm với đủ loại món ăn vặt. Mẹo nhỏ: nếu muốn thong thả, hãy đến vào buổi sáng sớm khi chợ còn mát và ít đông.`],
      [`Ben Thanh Market`, `Hello, and welcome to Ben Thanh Market, the most familiar symbol of Ho Chi Minh City.

The present building was constructed in the early twentieth century and opened in 1914. Long before that, a market already gathered here beside the Saigon River, where boats came to trade. As the city grew, the market moved to this site and was rebuilt as a sturdy hall with a tiled roof, iron columns and large gates.

Its best-known feature is the clock tower above the south gate. The tower has been part of Saigon life for more than a century, and it is a favourite meeting point and photo spot.

Inside, the market is divided into zones: fabrics, clothing, souvenirs, handicrafts, coffee and spices. Do not forget to bargain politely, as it is part of the market culture. The food area in the middle serves signature dishes such as fermented-fish noodles, grilled pork noodles, broken rice, sweet soups and iced milk coffee.

After six in the evening, the streets around the market turn into a night market full of snacks. A small tip: if you prefer a relaxed visit, come early in the morning, when it is cooler and less crowded.`],
      [`ベンタイン市場`, `ホーチミン市で最も有名な象徴、ベンタイン市場へようこそ。

現在の建物は20世紀初頭に建てられ、1914年に開業しました。それ以前からこの場所には、サイゴン川のほとりに船が集まる市場がありました。街の発展とともに、瓦屋根と鉄の柱、大きな門を備えた頑丈な建物に生まれ変わりました。

最大の見どころは、南門の上にある時計塔です。100年以上にわたって市民に親しまれ、待ち合わせや記念撮影の定番スポットになっています。

館内は、布地、衣類、お土産、工芸品、コーヒー、香辛料などのエリアに分かれています。値段交渉も市場文化の一部ですので、ぜひ笑顔でどうぞ。中央のフードコーナーでは、ブンマム、焼き豚のブン、コムタム、チェー、練乳入りアイスコーヒーが楽しめます。

夕方6時を過ぎると、周辺の通りは屋台が並ぶナイトマーケットになります。ゆっくり見たい方は、涼しくて空いている早朝がおすすめです。`],
      [`벤탄 시장`, `호찌민시의 가장 대표적인 상징, 벤탄 시장에 오신 것을 환영합니다.

현재의 건물은 20세기 초에 지어져 1914년에 문을 열었습니다. 그 이전에도 이곳에는 사이공강변에 배들이 모여 장사하던 시장이 있었습니다. 도시가 성장하면서 기와지붕과 철제 기둥, 큰 출입문을 갖춘 튼튼한 건물로 새로 지어졌습니다.

가장 유명한 볼거리는 남문 위의 시계탑입니다. 100년이 넘도록 시민들과 함께해 왔으며, 약속 장소이자 기념사진 명소입니다.

시장 안은 직물, 의류, 기념품, 공예품, 커피, 향신료 구역으로 나뉩니다. 흥정도 시장 문화의 일부이니 부드럽게 시도해 보세요. 중앙 푸드코트에서는 분맘, 구운 돼지고기 쌀국수, 껌땀, 쩨, 연유 아이스커피 같은 대표 음식을 맛볼 수 있습니다.

저녁 6시 이후에는 주변 거리가 간식 노점이 늘어선 야시장으로 바뀝니다. 여유롭게 둘러보려면 시원하고 한적한 이른 아침을 추천합니다.`]) },

  { meta: { category: 'history', emoji: '🏛️', address: '135 Nam Kỳ Khởi Nghĩa', lat: 10.777, lng: 106.6955, hours: '7:30 – 16:00', year: '1966' },
    tr: L([`Dinh Độc Lập`, `Chào mừng bạn đến với Dinh Độc Lập, còn gọi là Hội trường Thống Nhất, một trong những di tích quan trọng nhất của Việt Nam.

Khu đất này từng là nơi đặt dinh Toàn quyền Đông Dương thời Pháp thuộc. Sau khi dinh cũ bị hư hại nặng vào năm 1962, một công trình mới được xây dựng và hoàn thành năm 1966 theo thiết kế của kiến trúc sư Ngô Viết Thụ, người từng đoạt giải Khôi nguyên La Mã. Tòa nhà mang phong cách hiện đại, lấy cảm hứng từ hình tượng chữ Cát trong Hán tự và nhiều yếu tố thiên nhiên của phương Đông, với những tấm lam che nắng bằng bê tông giúp công trình thoáng mát.

Dinh đi vào lịch sử vào trưa ngày 30 tháng 4 năm 1975, khi xe tăng của quân giải phóng tiến vào cổng, chấm dứt cuộc chiến tranh kéo dài nhiều thập kỷ. Hai chiếc xe tăng được trưng bày trong sân vườn là chứng tích cho khoảnh khắc ấy.

Khi tham quan, bạn sẽ lần lượt đi qua phòng khánh tiết, phòng họp nội các, phòng làm việc của tổng thống, phòng trình quốc thư, và khu tầng hầm với hệ thống hầm chỉ huy, phòng thông tin liên lạc và bản đồ quân sự được giữ gần như nguyên vẹn.

Ngày nay, Dinh Độc Lập là di tích quốc gia đặc biệt. Bạn nên dành khoảng một đến hai giờ để tham quan cho thật thong thả.`],
      [`Independence Palace`, `Welcome to Independence Palace, also known as Reunification Hall, one of the most important historic sites in Vietnam.

This land once held the residence of the Governor-General of Indochina during the French period. After the old palace was badly damaged in 1962, a new building was constructed and completed in 1966, designed by architect Ngo Viet Thu, a winner of the Prix de Rome. The modernist building draws on the shape of a Chinese character for good fortune and on many Eastern natural motifs, with concrete screens that shade the facade and keep the interior airy.

The palace entered history at midday on 30 April 1975, when tanks of the liberation forces rolled through its gate, ending a war that had lasted for decades. Two tanks displayed in the garden bear witness to that moment.

On your visit you will pass through the reception hall, the cabinet room, the president's office and the room where ambassadors presented their credentials. In the basement you will find the command bunker, communications room and military maps, kept almost exactly as they were.

Today the palace is a special national monument. Plan one to two hours so you can explore at a relaxed pace.`],
      [`独立宮殿`, `ベトナムで最も重要な史跡のひとつ、独立宮殿（統一会堂）へようこそ。

この土地には、フランス統治時代にインドシナ総督の官邸がありました。1962年に旧官邸が大きく損傷したため、新しい建物が建てられ、1966年に完成しました。設計はローマ賞を受賞した建築家グエン・ヴィエット・トゥーです。モダン建築でありながら、東洋の自然のモチーフを取り入れ、コンクリートの日よけが建物を涼しく保っています。

宮殿が歴史に刻まれたのは、1975年4月30日の正午です。解放軍の戦車が正門を通過し、長く続いた戦争が終わりました。庭に展示されている2台の戦車がその瞬間を物語っています。

見学では、レセプションホール、閣議室、大統領執務室、信任状奉呈の間を巡ります。地下には、司令室、通信室、軍事地図がほぼ当時のまま残っています。

現在は国の特別史跡です。ゆっくり見学するなら1〜2時間ほどみておきましょう。`],
      [`독립궁`, `베트남에서 가장 중요한 사적 중 하나인 독립궁, 통일궁에 오신 것을 환영합니다.

이 땅에는 프랑스 식민 시기 인도차이나 총독 관저가 있었습니다. 1962년 옛 관저가 크게 파손되자 새 건물이 지어져 1966년에 완공되었습니다. 설계는 로마 대상을 수상한 건축가 응오비엣투가 맡았습니다. 현대적인 건물이지만 동양의 자연 모티브를 담았고, 콘크리트 차양이 건물을 시원하게 유지해 줍니다.

궁이 역사에 기록된 것은 1975년 4월 30일 정오입니다. 해방군 탱크가 정문을 통과하며 수십 년 이어진 전쟁이 끝났습니다. 정원에 전시된 탱크 두 대가 그 순간을 증언합니다.

관람 코스에서는 접견실, 각료 회의실, 대통령 집무실, 신임장 제정실을 차례로 둘러봅니다. 지하에는 지휘 벙커, 통신실, 군사 지도가 거의 그대로 보존되어 있습니다.

현재는 국가 특별 사적입니다. 여유 있게 보려면 한두 시간 정도를 잡으세요.`]) },

  { meta: { category: 'religion', emoji: '⛪', address: '01 Công xã Paris', lat: 10.7798, lng: 106.699, hours: 'Tham quan bên ngoài; giờ lễ theo thông báo', year: '1880' },
    tr: L([`Nhà thờ Đức Bà`, `Chào mừng bạn đến với Nhà thờ Chính tòa Đức Bà Sài Gòn, công trình tôn giáo nổi tiếng nhất ở trung tâm thành phố.

Nhà thờ được xây dựng từ năm 1863 và hoàn thành năm 1880, theo phong cách Roman kết hợp Gothic. Toàn bộ gạch đỏ ở mặt ngoài được đưa từ Pháp sang, và đến nay vẫn giữ màu sắc rất đặc trưng mà không cần sơn phủ. Hai tháp chuông cao khoảng 58 mét được bổ sung sau đó, cùng với hệ thống chuông đồng nhập từ Pháp.

Trước nhà thờ là tượng Đức Mẹ Hòa Bình, được đặt năm 1959, làm bằng đá granit và là một biểu tượng của khu vực. Công trường phía trước từng là nơi người dân hẹn hò, chụp ảnh cưới và thả bồ câu.

Bên trong nhà thờ có không gian cao rộng, cửa kính màu và nhiều bàn thờ nhỏ hai bên. Vì là nơi thờ tự đang hoạt động, bạn nên ăn mặc kín đáo, giữ yên lặng và không làm gián đoạn các buổi lễ.

Từ những năm gần đây, nhà thờ được trùng tu theo từng giai đoạn nên có thể có giàn giáo che một phần mặt tiền. Hãy kiểm tra thông tin trước khi đến. Ngay bên cạnh là Bưu điện Trung tâm, bạn có thể đi bộ sang chỉ trong vài phút.`],
      [`Notre-Dame Basilica`, `Welcome to Saigon Notre-Dame Basilica, the best-known religious landmark in the city centre.

Construction began in 1863 and finished in 1880, in a Romanesque style mixed with Gothic features. All the red bricks on the exterior were shipped from France, and they still keep their distinctive colour without any paint. The two bell towers, about 58 metres high, were added later, along with bronze bells imported from France.

In front stands the statue of Our Lady of Peace, placed in 1959 and carved from granite. The square before it has long been a place for meeting friends, taking wedding photos and feeding pigeons.

Inside you will find a tall, wide nave, stained glass and small altars along both sides. Because it is a working place of worship, please dress modestly, keep quiet and do not disturb services.

In recent years the building has been restored in stages, so scaffolding may cover part of the facade. Check the latest information before you go. Right next door is the Central Post Office, only a few minutes on foot.`],
      [`サイゴン大教会`, `市の中心部で最も有名な宗教建築、サイゴン大教会へようこそ。

建設は1863年に始まり、1880年に完成しました。ロマネスク様式にゴシックの要素を加えた設計です。外壁の赤レンガはすべてフランスから運ばれ、塗装をしなくても独特の色合いを保っています。高さ約58メートルの2つの鐘楼は後に加えられ、鐘もフランスから取り寄せられました。

正面には、1959年に建てられた花崗岩の聖母マリア像があります。前の広場は、待ち合わせや結婚写真の撮影、鳩との触れ合いの場として親しまれてきました。

内部は高く広い身廊と、ステンドグラス、両側の小さな祭壇が印象的です。現在も礼拝が行われているため、露出の少ない服装で静かに見学してください。

近年は段階的に修復工事が行われ、正面に足場が組まれていることがあります。訪問前に最新情報をご確認ください。すぐ隣の中央郵便局へは徒歩数分です。`],
      [`사이공 노트르담 대성당`, `도심에서 가장 유명한 종교 건축물, 사이공 노트르담 대성당에 오신 것을 환영합니다.

공사는 1863년에 시작되어 1880년에 완공되었으며, 로마네스크 양식에 고딕 요소를 더했습니다. 외벽의 붉은 벽돌은 모두 프랑스에서 들여왔고, 페인트 없이도 특유의 색을 지키고 있습니다. 높이 약 58미터의 두 종탑은 나중에 추가되었고, 청동 종도 프랑스에서 가져왔습니다.

정면에는 1959년에 세워진 화강암 성모상이 있습니다. 앞 광장은 오래전부터 약속 장소이자 웨딩 촬영지, 비둘기 먹이를 주는 곳으로 사랑받았습니다.

내부에는 높고 넓은 본당과 스테인드글라스, 양쪽의 작은 제단이 있습니다. 지금도 예배가 열리는 곳이므로 단정한 옷차림으로 조용히 관람해 주세요.

최근에는 단계적으로 보수 공사를 하고 있어 정면 일부에 비계가 설치되어 있을 수 있습니다. 방문 전에 최신 정보를 확인하세요. 바로 옆에 중앙우체국이 있어 걸어서 몇 분이면 갑니다.`]) },

  { meta: { category: 'history', emoji: '📮', address: '02 Công xã Paris', lat: 10.7799, lng: 106.7, hours: '7:00 – 19:00', year: '1891' },
    tr: L([`Bưu điện Trung tâm Sài Gòn`, `Chào mừng bạn đến với Bưu điện Trung tâm Sài Gòn, một trong những bưu điện đẹp nhất thế giới.

Công trình được xây từ năm 1886 đến 1891, theo phong cách kiến trúc Pháp pha trộn nhiều yếu tố Á Đông. Nhiều người tin rằng nhà thiết kế là Gustave Eiffel, nhưng thực tế người thực hiện là kiến trúc sư Alfred Foulhoux. Có lẽ vì mái vòm sắt rất giống các nhà ga châu Âu cùng thời mà giai thoại này được lưu truyền.

Mặt tiền màu vàng nhạt với các ô cửa vòm cao, tên của các nhà khoa học nổi tiếng được khắc phía trên. Bước vào bên trong, bạn sẽ thấy mái vòm sắt cao, sàn gạch hoa, những quầy giao dịch bằng gỗ và hai tấm bản đồ cổ vẽ tay treo hai bên tường, mô tả vùng Sài Gòn và đường dây điện báo thời xưa.

Ở cuối sảnh là bức chân dung Chủ tịch Hồ Chí Minh. Điều đặc biệt là bưu điện vẫn hoạt động mỗi ngày, bạn có thể mua tem, viết bưu thiếp và gửi về cho bạn bè như một kỷ niệm đáng nhớ.

Đây là điểm chụp ảnh miễn phí rất được yêu thích, và chỉ cách Nhà thờ Đức Bà một đoạn ngắn.`],
      [`Saigon Central Post Office`, `Welcome to the Saigon Central Post Office, one of the most beautiful post offices in the world.

It was built between 1886 and 1891 in French architectural style blended with Asian touches. Many people believe it was designed by Gustave Eiffel, but it was actually the work of architect Alfred Foulhoux. The story probably spread because the iron-vaulted ceiling resembles European railway stations of the same period.

The pale yellow facade has tall arched windows, with the names of famous scientists carved above them. Inside you will see the high iron vault, patterned tile floors, wooden counters and two old hand-painted maps on the side walls, showing the Saigon area and the telegraph lines of the past.

At the far end of the hall hangs a portrait of President Ho Chi Minh. Best of all, it is still a working post office, so you can buy stamps, write a postcard and send it home as a lasting souvenir.

It is a very popular free photo spot, and only a short walk from the Notre-Dame Basilica.`],
      [`サイゴン中央郵便局`, `世界で最も美しい郵便局のひとつ、サイゴン中央郵便局へようこそ。

建物は1886年から1891年にかけて、フランス様式にアジアの要素を加えて建てられました。エッフェルが設計したと信じる人も多いのですが、実際の設計者は建築家アルフレッド・フールーです。鉄骨のアーチ天井が同時代のヨーロッパの駅舎に似ているため、この逸話が広まったようです。

淡い黄色の外観には高いアーチ窓が並び、上部には著名な科学者の名前が刻まれています。中に入ると、高い鉄の天井、模様入りのタイルの床、木製のカウンター、そして壁に手描きの古い地図が2枚掛かっています。

ホールの奥にはホー・チ・ミン主席の肖像があります。ここは今も現役の郵便局なので、切手を買ってポストカードを書き、旅の思い出として送ることができます。

無料で撮影できる人気スポットで、サイゴン大教会からも歩いてすぐです。`],
      [`사이공 중앙우체국`, `세계에서 가장 아름다운 우체국 중 하나, 사이공 중앙우체국에 오신 것을 환영합니다.

건물은 1886년부터 1891년 사이에 프랑스 양식에 아시아적 요소를 섞어 지어졌습니다. 많은 사람이 에펠이 설계했다고 믿지만, 실제 설계자는 건축가 알프레드 풀루입니다. 철골 아치 천장이 같은 시대 유럽의 기차역과 닮아서 이런 이야기가 퍼진 것으로 보입니다.

연한 노란색 외관에는 높은 아치창이 이어지고, 위쪽에는 유명한 과학자들의 이름이 새겨져 있습니다. 안으로 들어가면 높은 철제 천장, 무늬 타일 바닥, 나무 창구, 그리고 벽에 걸린 손으로 그린 옛 지도 두 장이 보입니다.

홀 안쪽에는 호찌민 주석의 초상이 걸려 있습니다. 지금도 실제로 운영되는 우체국이라 우표를 사서 엽서를 써 보내며 여행의 추억을 남길 수 있습니다.

무료로 사진을 찍을 수 있는 인기 장소이며, 노트르담 대성당에서도 걸어서 가깝습니다.`]) },

  { meta: { category: 'culture', emoji: '🕊️', address: '28 Võ Văn Tần', lat: 10.7794, lng: 106.6922, hours: '7:30 – 17:30', year: '1975' },
    tr: L([`Bảo tàng Chứng tích Chiến tranh`, `Chào mừng bạn đến với Bảo tàng Chứng tích Chiến tranh, nơi lưu giữ ký ức về cuộc chiến tranh Việt Nam.

Bảo tàng được thành lập năm 1975, ban đầu mang tên khác, và đổi sang tên hiện nay vào năm 1995. Đây là một trong những bảo tàng có nhiều khách tham quan nhất cả nước, đón du khách đến từ khắp nơi trên thế giới.

Sân trước trưng bày máy bay, xe tăng, pháo và các loại vũ khí. Bên trong là nhiều tầng triển lãm với hình ảnh của các nhà báo chiến trường, hiện vật, và các chuyên đề về hậu quả của chất độc da cam đối với nhiều thế hệ người Việt Nam.

Một khu vực đáng chú ý khác là mô hình nhà tù và chuồng cọp, tái hiện điều kiện giam giữ tù nhân thời chiến.

Nhiều hình ảnh trong bảo tàng rất nặng nề và có thể gây xúc động mạnh. Nếu đi cùng trẻ nhỏ, bạn nên cân nhắc. Hãy dành thời gian để lặng lẽ xem và suy ngẫm. Thông điệp lớn nhất mà nơi này muốn gửi đến mọi người là khát vọng hòa bình.

Thời gian tham quan thường mất từ một đến hai giờ.`],
      [`War Remnants Museum`, `Welcome to the War Remnants Museum, which keeps the memory of the Vietnam War.

The museum was founded in 1975 under a different name and took its present name in 1995. It is one of the most visited museums in the country, welcoming travellers from all over the world.

The front yard displays aircraft, tanks, artillery and other weapons. Inside are several floors of exhibitions with photographs by war reporters, artefacts, and themed displays on the effects of Agent Orange across generations of Vietnamese families.

Another notable area is a reconstruction of a prison and its tiger cages, showing how prisoners were held during the war.

Many images here are very heavy and can be deeply moving. If you are visiting with young children, please think carefully. Take your time to look quietly and reflect. The strongest message this place wants to share is the hope for peace.

A visit usually takes one to two hours.`],
      [`戦争証跡博物館`, `ベトナム戦争の記憶を伝える戦争証跡博物館へようこそ。

博物館は1975年に別の名称で設立され、1995年に現在の名前になりました。国内で最も来館者の多い博物館のひとつで、世界中から旅行者が訪れます。

前庭には航空機、戦車、大砲などが展示されています。館内は複数階にわたり、従軍記者の写真、遺品、枯葉剤が何世代にもわたって人々に与えた影響を伝える展示があります。

また、戦時中の収容の様子を再現した監獄と「トラの檻」の展示もあります。

館内の写真には非常に衝撃的なものが多く、強い感情を呼び起こすことがあります。小さなお子様連れの場合はご検討ください。静かにじっくり見て、考える時間をお取りください。この場所が伝える最も大きなメッセージは、平和への願いです。

見学時間は1〜2時間ほどです。`],
      [`전쟁증적박물관`, `베트남 전쟁의 기억을 간직한 전쟁증적박물관에 오신 것을 환영합니다.

박물관은 1975년에 다른 이름으로 설립되었고 1995년에 지금의 이름으로 바뀌었습니다. 전국에서 방문객이 가장 많은 박물관 중 하나로, 전 세계에서 여행객이 찾아옵니다.

앞마당에는 항공기, 탱크, 대포 등이 전시되어 있습니다. 실내는 여러 층에 걸쳐 종군기자들의 사진, 유물, 고엽제가 여러 세대에 미친 영향을 다룬 전시가 이어집니다.

전쟁 중 수감 상황을 재현한 감옥과 호랑이 우리 전시도 눈여겨볼 만합니다.

이곳의 사진 중에는 매우 충격적인 것이 많아 마음이 크게 움직일 수 있습니다. 어린 자녀와 함께라면 신중히 판단하세요. 조용히 천천히 보며 생각할 시간을 가지세요. 이곳이 전하는 가장 큰 메시지는 평화에 대한 염원입니다.

관람에는 보통 한두 시간이 걸립니다.`]) },

  { meta: { category: 'history', emoji: '🕳️', address: 'Huyện Củ Chi, cách trung tâm khoảng 70 km', lat: 11.1428, lng: 106.4627, hours: '7:00 – 17:00', year: '1948' },
    tr: L([`Địa đạo Củ Chi`, `Chào mừng bạn đến với Địa đạo Củ Chi, một công trình dưới lòng đất kỳ diệu cách trung tâm thành phố khoảng bảy mươi cây số.

Hệ thống địa đạo được bắt đầu đào từ cuối những năm 1940, trong kháng chiến chống Pháp, rồi được mở rộng rất nhiều trong chiến tranh sau này. Tổng chiều dài hàng trăm cây số, chia làm nhiều tầng sâu nông khác nhau, nối các làng với nhau. Bên trong có hầm họp, nhà bếp, kho lương, kho vũ khí, trạm xá và cả nơi sinh hoạt của người dân.

Một chi tiết đặc biệt là bếp Hoàng Cầm, loại bếp được thiết kế để khói tản ra xa theo nhiều đường dẫn, tránh bị phát hiện từ trên không. Bạn cũng sẽ thấy nhiều loại bẫy được làm thủ công, cùng cửa hầm nhỏ được ngụy trang kín đáo.

Du khách có thể chui thử một đoạn hầm đã được nới rộng hơn so với kích thước ban đầu. Dù vậy, không gian vẫn rất chật và nóng, bạn sẽ hiểu được phần nào sự gian khổ của những người từng sống ở đây. Nếu bạn dễ sợ không gian hẹp, có thể chọn đi đoạn ngắn hoặc đứng ngoài.

Cuối chuyến tham quan, bạn có thể nếm món khoai mì hấp chấm muối mè, món ăn thời kháng chiến. Nên mang giày thoải mái, nón và nước uống.`],
      [`Cu Chi Tunnels`, `Welcome to the Cu Chi Tunnels, a remarkable underground complex about seventy kilometres from the city centre.

Digging began in the late 1940s during the resistance against the French, and the network was greatly expanded in the later war. In total it stretches for hundreds of kilometres on several levels at different depths, linking villages together. Inside were meeting rooms, kitchens, food stores, weapon stores, field clinics and even living areas for villagers.

One special detail is the Hoang Cam kitchen, designed so that smoke was released through long channels and spread far away, avoiding detection from the air. You will also see many handmade traps and small hatches carefully hidden from view.

Visitors can crawl through a section that has been widened from its original size. Even so, it is cramped and hot, and you will gain some sense of the hardship of the people who once lived here. If you dislike tight spaces, you can choose a short stretch or stay outside.

At the end of your visit you can taste steamed tapioca with sesame salt, a wartime food. Wear comfortable shoes and bring a hat and water.`],
      [`クチトンネル`, `市の中心部から約70キロ、地下に広がる驚異の施設、クチトンネルへようこそ。

トンネルの掘削は1940年代後半、フランスに対する抵抗運動の中で始まり、その後の戦争でさらに拡張されました。全長は数百キロに及び、深さの異なる複数の層で村々をつないでいます。内部には会議室、台所、食料庫、武器庫、野戦病院、村人の生活空間までありました。

特に興味深いのが、ホアン・カム式のかまどです。煙が長い通路を通って遠くへ拡散するように作られ、空からの発見を避けました。手作りの罠や、巧妙に隠された小さな出入口も見られます。

元の大きさより広げられた区間を、実際に這って通ることもできます。それでも狭くて暑く、ここで暮らした人々の苦労を少し感じられるでしょう。狭い場所が苦手な方は、短い区間だけにするか、外で待つこともできます。

見学の最後には、戦時中の食べ物だったゴマ塩をつけた蒸しタピオカを味わえます。歩きやすい靴、帽子、飲み物をお持ちください。`],
      [`꾸찌 터널`, `도심에서 약 70킬로미터 떨어진 놀라운 지하 시설, 꾸찌 터널에 오신 것을 환영합니다.

터널 굴착은 1940년대 후반 프랑스에 맞선 항전 중에 시작되어 이후 전쟁 동안 크게 확장되었습니다. 전체 길이는 수백 킬로미터에 이르며, 깊이가 다른 여러 층으로 마을들을 이었습니다. 내부에는 회의실, 부엌, 식량 창고, 무기 창고, 야전 진료소, 주민 생활 공간까지 있었습니다.

특히 흥미로운 것은 호앙깜 부뚜막입니다. 연기가 긴 통로를 따라 멀리 퍼지도록 설계해 공중에서 발각되는 것을 피했습니다. 손으로 만든 여러 함정과 교묘하게 위장된 작은 출입구도 볼 수 있습니다.

원래 크기보다 넓혀 놓은 구간을 직접 기어서 지나갈 수도 있습니다. 그래도 좁고 덥기 때문에 이곳에서 살았던 사람들의 고난을 조금은 느낄 수 있습니다. 좁은 공간이 힘들다면 짧은 구간만 가거나 밖에서 기다려도 됩니다.

관람 끝에는 전쟁 때 먹던 참깨 소금을 곁들인 찐 카사바를 맛볼 수 있습니다. 편한 신발과 모자, 물을 챙기세요.`]) },

  { meta: { category: 'culture', emoji: '🚶', address: 'Đường Nguyễn Huệ', lat: 10.7745, lng: 106.704, hours: 'Cả ngày, sôi động nhất buổi tối', year: '2015' },
    tr: L([`Phố đi bộ Nguyễn Huệ`, `Chào mừng bạn đến với phố đi bộ Nguyễn Huệ, trái tim sôi động của trung tâm thành phố.

Con đường dài khoảng sáu trăm bảy mươi mét, nối Ủy ban Nhân dân Thành phố ở phía trên với bến Bạch Đằng bên sông Sài Gòn. Từ năm 2015, phố được chuyển thành không gian dành cho người đi bộ, nơi diễn ra nhiều lễ hội lớn như Tết Nguyên đán, Trung thu, Giáng sinh và đêm đếm ngược năm mới.

Đứng ở đầu phố, bạn sẽ thấy tượng đài Chủ tịch Hồ Chí Minh trước Ủy ban Nhân dân Thành phố. Hai bên đường là những tòa nhà cao tầng, quán cà phê, cửa hàng thời trang và đài phun nước lớn. Dọc theo phố có nhiều khu vực nghệ sĩ đường phố biểu diễn nhạc, vẽ tranh và nhảy múa.

Có một địa chỉ rất được yêu thích là chung cư cũ số bốn mươi hai Nguyễn Huệ, nơi nhiều quán cà phê, cửa hàng nhỏ và gian triển lãm nằm xen kẽ qua những hành lang và cầu thang cũ kỹ.

Hãy đến vào buổi chiều tối để đi dạo, ngắm đèn lên và ra tận bờ sông hóng gió.`],
      [`Nguyen Hue Walking Street`, `Welcome to Nguyen Hue Walking Street, the lively heart of the city centre.

The street is about six hundred and seventy metres long, linking the City Hall at the top to the Bach Dang riverside on the Saigon River. Since 2015 it has been a pedestrian space hosting big festivals such as Lunar New Year, Mid-Autumn, Christmas and the New Year countdown.

At the top of the street you will see the statue of Ho Chi Minh in front of the City Hall. On both sides are tall buildings, cafés, fashion shops and a large fountain. Along the way, street artists play music, paint and dance in several spots.

One much-loved address is the old apartment block at number forty-two Nguyen Hue, where cafés, small shops and galleries are tucked along old corridors and staircases.

Come in the early evening to stroll, watch the lights come on and go all the way to the riverside to enjoy the breeze.`],
      [`グエンフエ歩行者通り`, `市の中心部の活気あふれる場所、グエンフエ歩行者通りへようこそ。

通りの長さは約670メートルで、上端の市人民委員会庁舎から、サイゴン川沿いのバクダン埠頭までをつなぎます。2015年から歩行者空間となり、テト、中秋節、クリスマス、カウントダウンなどの大きなイベントが開かれます。

通りの始まりには、市人民委員会庁舎の前にホー・チ・ミン像があります。両側には高層ビル、カフェ、ファッション店、大きな噴水が並びます。通り沿いでは、路上のアーティストが音楽や絵、ダンスを披露しています。

人気なのが、グエンフエ42番地の古いアパートです。古い廊下や階段に沿って、カフェや小さな店、ギャラリーが点在しています。

夕方に訪れて散歩し、明かりが灯るのを眺め、川辺まで行って風を感じましょう。`],
      [`응우옌후에 보행자 거리`, `도심의 활기찬 중심, 응우옌후에 보행자 거리에 오신 것을 환영합니다.

거리의 길이는 약 670미터로, 위쪽의 시 인민위원회 청사에서 사이공강변의 바익당 부두까지 이어집니다. 2015년부터 보행자 공간이 되어 뗏, 중추절, 크리스마스, 새해 카운트다운 같은 큰 행사가 열립니다.

거리 입구에서는 시 인민위원회 청사 앞의 호찌민 동상이 보입니다. 양옆에는 고층 건물, 카페, 패션 매장, 큰 분수가 있습니다. 길을 따라 거리 예술가들이 음악을 연주하고 그림을 그리고 춤을 춥니다.

특히 인기 있는 곳은 응우옌후에 42번지의 오래된 아파트입니다. 낡은 복도와 계단을 따라 카페와 작은 가게, 갤러리가 자리해 있습니다.

초저녁에 방문해 산책하며 불이 켜지는 모습을 보고, 강변까지 가서 바람을 쐬어 보세요.`]) },

  { meta: { category: 'culture', emoji: '🏙️', address: '720A Điện Biên Phủ', lat: 10.7951, lng: 106.7218, hours: 'Đài quan sát SkyView: 9:30 – 22:00', year: '2018' },
    tr: L([`Landmark 81`, `Chào mừng bạn đến với Landmark 81, tòa nhà cao nhất Việt Nam và là biểu tượng mới của thành phố.

Tòa tháp có tám mươi mốt tầng, cao bốn trăm sáu mươi mốt phẩy ba mét, khánh thành năm 2018. Vào thời điểm đó, đây là tòa nhà cao nhất Đông Nam Á. Thiết kế của tòa nhà lấy cảm hứng từ hình ảnh bó tre với các mặt kính xanh xếp tầng, tượng trưng cho sự vươn lên bền bỉ của người Việt.

Landmark 81 nằm trong khu đô thị Vinhomes Central Park bên bờ sông Sài Gòn. Phía dưới là trung tâm thương mại với nhà hàng, cửa hàng, rạp chiếu phim và nhiều hoạt động giải trí cho cả gia đình.

Điểm nhấn dành cho du khách là đài quan sát SkyView ở các tầng cao nhất. Từ đây, bạn có thể nhìn toàn cảnh sông Sài Gòn uốn lượn, các cây cầu, trung tâm thành phố và khu đô thị Thủ Thiêm. Hoàng hôn là thời điểm đẹp nhất, khi bầu trời đổi màu rồi thành phố bừng sáng ánh đèn.

Bạn nên mua vé trước để tránh phải xếp hàng, và kiểm tra thời tiết vì những ngày nhiều mây tầm nhìn sẽ bị hạn chế.`],
      [`Landmark 81`, `Welcome to Landmark 81, the tallest building in Vietnam and a new symbol of the city.

The tower has eighty-one floors and stands four hundred and sixty-one point three metres tall. It opened in 2018, and at that time it was the tallest building in Southeast Asia. The design is inspired by a bundle of bamboo, with stepped blue glass facades symbolising the resilient rise of the Vietnamese people.

Landmark 81 sits in the Vinhomes Central Park development on the bank of the Saigon River. At its base is a shopping centre with restaurants, shops, a cinema and many activities for the whole family.

The highlight for visitors is the SkyView observation deck on the top floors. From here you can take in the winding Saigon River, its bridges, the city centre and the Thu Thiem urban area. Sunset is the best time, as the sky changes colour and the city lights up.

Buy your ticket in advance to avoid queues, and check the weather, since cloudy days limit the view.`],
      [`ランドマーク81`, `ベトナムで最も高いビルであり、街の新しい象徴、ランドマーク81へようこそ。

塔は81階建てで、高さは461.3メートル。2018年に開業し、当時は東南アジアで最も高い建物でした。設計は竹の束に着想を得ており、段状に重なる青いガラスの外壁が、ベトナムの人々のたくましい成長を象徴しています。

サイゴン川沿いのビンホームズ・セントラルパーク内にあり、低層階にはレストラン、ショップ、映画館などを備えたショッピングセンターがあります。

旅行者の一番の目的は、最上階にある展望台スカイビューです。蛇行するサイゴン川、橋、市中心部、トゥーティエム地区を一望できます。空の色が変わり、街に明かりが灯る夕暮れが最もおすすめです。

行列を避けるため、チケットは事前に購入しましょう。曇りの日は眺めが限られるため、天気もご確認ください。`],
      [`랜드마크 81`, `베트남에서 가장 높은 건물이자 도시의 새로운 상징, 랜드마크 81에 오신 것을 환영합니다.

타워는 81층, 높이 461.3미터로 2018년에 개장했으며 당시 동남아시아에서 가장 높은 건물이었습니다. 대나무 다발에서 영감을 받은 디자인으로, 계단식으로 쌓인 푸른 유리 외벽이 베트남 사람들의 꿋꿋한 성장을 상징합니다.

사이공강변의 빈홈즈 센트럴 파크 안에 있으며, 저층부에는 식당, 상점, 영화관을 갖춘 쇼핑센터가 있습니다.

여행객에게 가장 큰 볼거리는 최상층의 스카이뷰 전망대입니다. 굽이치는 사이공강과 다리, 도심, 투티엠 지구를 한눈에 볼 수 있습니다. 하늘 색이 바뀌고 도시에 불이 켜지는 해 질 녘이 가장 좋습니다.

줄을 피하려면 티켓을 미리 사고, 흐린 날은 전망이 제한되니 날씨도 확인하세요.`]) }
];
