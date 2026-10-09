export const seed = () => ({
  langs: [
    { code: 'vi', name: 'Tiếng Việt', tts: 'vi-VN' },
    { code: 'en', name: 'Tiếng Anh', tts: 'en-US' },
    { code: 'ja', name: 'Tiếng Nhật', tts: 'ja-JP' },
    { code: 'ko', name: 'Tiếng Hàn', tts: 'ko-KR' }
  ],
  nid: 4,
  contents: [
    { id: 1, tr: {
      vi: { title: 'Chợ Bến Thành', body: 'Chợ Bến Thành là biểu tượng của Thành phố Hồ Chí Minh, khánh thành năm 1914. Nơi đây bán đủ loại hàng hóa và ẩm thực địa phương.' },
      en: { title: 'Ben Thanh Market', body: 'Ben Thanh Market is an icon of Ho Chi Minh City, opened in 1914. It sells all kinds of goods and local food.' },
      ja: { title: 'ベンタイン市場', body: 'ベンタイン市場はホーチミン市の象徴で、1914年に開業しました。さまざまな商品や地元料理が楽しめます。' },
      ko: { title: '벤탄 시장', body: '벤탄 시장은 1914년에 문을 연 호찌민시의 상징입니다. 다양한 상품과 현지 음식을 만날 수 있습니다.' } } },
    { id: 2, tr: {
      vi: { title: 'Dinh Độc Lập', body: 'Dinh Độc Lập là nơi diễn ra sự kiện lịch sử ngày 30/4/1975. Công trình nay là di tích quốc gia đặc biệt.' },
      en: { title: 'Independence Palace', body: 'Independence Palace is where the historic events of 30 April 1975 took place. It is now a special national monument.' } } },
    { id: 3, tr: {
      vi: { title: 'Nhà thờ Đức Bà', body: 'Nhà thờ Đức Bà Sài Gòn được xây bằng gạch đỏ nhập từ Pháp, hoàn thành năm 1880.' },
      en: { title: 'Notre-Dame Cathedral', body: 'Saigon Notre-Dame Cathedral was built with red bricks imported from France and completed in 1880.' },
      ja: { title: '聖母マリア教会', body: 'サイゴン大教会はフランスから輸入した赤レンガで造られ、1880年に完成しました。' } } }
  ]
});
