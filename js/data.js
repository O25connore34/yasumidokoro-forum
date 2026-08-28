const NOW = Date.parse("2026-08-26T15:10:00+03:00");

function hoursAgo(h) {
  return NOW - h * 3600 * 1000;
}
function daysAgo(d) {
  return NOW - d * 86400 * 1000;
}

const USERS = [
  {
    id: "aoki-natsu",
    avatar: "public/images/avatars/aoki.png",
    lang: "ja",
    name: { ja: "青木 夏", ru: "Аоки Нацу", en: "Natsu Aoki" },
    handle: "aoki",
    loc: { ja: "松本・島内", ru: "Симаути, Мацумото", en: "Shimauchi, Matsumoto" },
    role: { ja: "テント泊", ru: "Ночует в палатке", en: "Tent nights" },
    bio: "徳沢と横尾を年に何度も。河童橋から先の風は午後に見る。",
    joined: "2019-04-12",
    seen: hoursAgo(1)
  },
  {
    id: "endo-kenji",
    avatar: "public/images/avatars/endo.png",
    lang: "ja",
    name: { ja: "遠藤 健二", ru: "Эндо Кэндзи", en: "Kenji Endō" },
    handle: "endo",
    loc: { ja: "大町", ru: "Омати", en: "Ōmachi" },
    role: { ja: "山小屋番", ru: "Сторож избы", en: "Hut keeper" },
    bio: "電話は16時まで。夕食の人数は朝のうちに。",
    joined: "2017-06-01",
    seen: hoursAgo(3)
  },
  {
    id: "irina-sokolova",
    avatar: "public/images/avatars/irina.png",
    lang: "ru",
    name: { ja: "イリーナ・ソコロワ", ru: "Ирина Соколова", en: "Irina Sokolova" },
    handle: "irina",
    loc: { ja: "旭川", ru: "Асахикава", en: "Asahikawa" },
    role: { ja: "大雪の縦走", ru: "Хребты Дайсэцу", en: "Daisetsu traverses" },
    bio: "Снег в июне на плато ещё лежит полосами. Пишу, когда ветер с Сёункё.",
    joined: "2021-05-18",
    seen: hoursAgo(5)
  },
  {
    id: "sato-haru",
    avatar: "public/images/avatars/sato.png",
    lang: "ja",
    name: { ja: "佐藤 春", ru: "Сато Хару", en: "Haru Satō" },
    handle: "haru",
    loc: { ja: "青梅", ru: "Оме", en: "Ōme" },
    role: { ja: "林道の車中", ru: "Ночь в машине на лесной дороге", en: "Forest-road van nights" },
    bio: "軽バン。氷川から先はゲートの時間を先に見る。",
    joined: "2020-09-03",
    seen: hoursAgo(8)
  },
  {
    id: "helen-brooke",
    avatar: "public/images/avatars/helen.png",
    lang: "en",
    name: { ja: "ヘレン・ブルック", ru: "Хелен Брук", en: "Helen Brooke" },
    handle: "helen",
    loc: { ja: "長野・戸隠", ru: "Тогакуси, Нагано", en: "Togakushi, Nagano" },
    role: { ja: "縦走路", ru: "Длинные хребты", en: "Long ridgelines" },
    bio: "I walk hut-to-hut when the snow has left the boards. I ask about water first.",
    joined: "2018-11-22",
    seen: hoursAgo(12)
  },
  {
    id: "nishi-mio",
    avatar: "public/images/avatars/nishi.png",
    lang: "ja",
    name: { ja: "西 美緒", ru: "Ниси Мио", en: "Mio Nishi" },
    handle: "mio",
    loc: { ja: "松山", ru: "Мацуяма", en: "Matsuyama" },
    role: { ja: "歩きのあと湯治", ru: "Онсэн после хода", en: "Bath after the walk" },
    bio: "石鎚の下りは膝。湯は夜の一番湯を外す。",
    joined: "2022-03-09",
    seen: hoursAgo(20)
  },
  {
    id: "mori-tadao",
    avatar: "public/images/avatars/mori.png",
    lang: "ja",
    name: { ja: "森 忠男", ru: "Мори Тадао", en: "Tadao Mori" },
    handle: "mori",
    loc: { ja: "上川", ru: "Камикава", en: "Kamikawa" },
    role: { ja: "巡視", ru: "Обход троп", en: "Trail patrol" },
    bio: "閉山と熊は紙の掲示が先。ネットの数字は後から。",
    joined: "2016-04-01",
    seen: hoursAgo(2)
  },
  {
    id: "pavel-orlov",
    avatar: "public/images/avatars/pavel.png",
    lang: "ru",
    name: { ja: "パーヴェル・オルロフ", ru: "Павел Орлов", en: "Pavel Orlov" },
    handle: "pavel",
    loc: { ja: "奈良・田原", ru: "Тавара, Нара", en: "Tawara, Nara" },
    role: { ja: "里山の日帰り", ru: "День в сатояме", en: "Satoyama day walks" },
    bio: "Пишу про воду в колодце и про то, где можно сидеть, не заходя в чужой двор.",
    joined: "2023-07-14",
    seen: daysAgo(1)
  }
];

const CATS = [
  {
    id: "camp",
    color: "#6a5340",
    img: "public/images/categories/camp.png",
    name: { ja: "野営場", ru: "Лагеря", en: "Campgrounds" },
    blurb: {
      ja: "指定地のテント。予約の有無と水場。",
      ru: "Палатка на отведённом месте. Бронь и вода.",
      en: "Tents on designated pads. Booking and water."
    }
  },
  {
    id: "hut",
    color: "#4a4038",
    img: "public/images/categories/hut.png",
    name: { ja: "山小屋", ru: "Избы", en: "Huts" },
    blurb: {
      ja: "電話と夕食の締切。空きは前日の話。",
      ru: "Телефон и отсечка ужина. Свободные места — вчерашние.",
      en: "Phone and dinner cutoff. Vacancies are yesterday’s."
    }
  },
  {
    id: "rindo",
    color: "#3f5340",
    img: "public/images/categories/rindo.png",
    name: { ja: "林道", ru: "Лесные дороги", en: "Forest roads" },
    blurb: {
      ja: "ゲート、車中、夜間のトイレ。",
      ru: "Шлагбаум, ночь в машине, ночной туалет.",
      en: "Gates, sleeping in the car, night toilets."
    }
  },
  {
    id: "river",
    color: "#4a5a52",
    img: "public/images/categories/river.png",
    name: { ja: "渓畔", ru: "Берег ручья", en: "Stream banks" },
    blurb: {
      ja: "座れる石、取水、増水。",
      ru: "Камень, чтобы сесть, забор воды, паводок.",
      en: "A sitting stone, water take, flood rise."
    }
  },
  {
    id: "toji",
    color: "#a34a28",
    img: "public/images/categories/toji.png",
    name: { ja: "湯治", ru: "Онсэн после хода", en: "Bath after walking" },
    blurb: {
      ja: "歩きのあと体を預ける湯。宿の話は泊まった人だけ。",
      ru: "Баня, куда кладут тело после хода. Про ночлег — кто ночевал.",
      en: "A bath to leave the body after walking. Lodging from those who stayed."
    }
  },
  {
    id: "satoyama",
    color: "#5a6a3a",
    img: "public/images/categories/satoyama.png",
    name: { ja: "里山", ru: "Сатояма", en: "Satoyama" },
    blurb: {
      ja: "日帰りの休み場。他人の庭に入らない。",
      ru: "Дневной привал. В чужой двор не заходить.",
      en: "Day rest. Do not step into someone else’s yard."
    }
  },
  {
    id: "season",
    color: "#7a5a28",
    img: "public/images/categories/season.png",
    name: { ja: "季節と危険", ru: "Сезон и опасность", en: "Season and hazard" },
    blurb: {
      ja: "残雪、熊、スズメバチ、通行止め。",
      ru: "Снег, медведь, шершень, перекрытие.",
      en: "Leftover snow, bear, hornet, closure."
    }
  },
  {
    id: "saho",
    color: "#5c4030",
    img: "public/images/categories/saho.png",
    name: { ja: "作法", ru: "Обычай", en: "Custom" },
    blurb: {
      ja: "火、ゴミ、トイレ、食糧の吊り。",
      ru: "Огонь, мусор, туалет, подвешенная еда.",
      en: "Fire, rubbish, toilets, hung food."
    }
  }
];

const TOPICS = [
  {
    id: "how-to",
    cat: "saho",
    pinned: true,
    img: "public/images/categories/saho.png",
    tags: { ja: ["使い方", "合印"], ru: ["как писать", "метки"], en: ["how we write", "marks"] },
    title: {
      ja: "休み処の使い方：地名を先に、空きは電話",
      ru: "Как писать на Ясумидокоро: сначала место, свободные места — по телефону",
      en: "How this board works: place-name first, vacancies by phone"
    },
    views: 4120,
    created: daysAgo(400),
    posts: [
      {
        user: "mori-tadao",
        at: daysAgo(400),
        likes: 88,
        body: {
          ja: "見出しは地名、本文は日付と水。空き人数を断定しない。小屋は電話。火は許可地だけ。顔とナンバーは切る。",
          ru: "В заголовке — место, в тексте — дата и вода. Число свободных мест не утверждаем. Изба — по телефону. Огонь только где можно. Лица и номера срезаем.",
          en: "Headline carries the place. Body carries the date and water. Do not state hut vacancies as fact. Phone the hut. Fire only where allowed. Crop faces and plates."
        }
      },
      {
        user: "aoki-natsu",
        at: daysAgo(12),
        likes: 14,
        body: {
          ja: "合印は三つまで。四つめは本文へ。",
          ru: "Меток не больше трёх. Четвёртая — в текст.",
          en: "Three marks at most. A fourth goes in the body."
        }
      }
    ]
  },
  {
    id: "kamikochi-saturday",
    cat: "camp",
    img: "public/images/topics/kamikochi.png",
    tags: { ja: ["上高地", "徳沢", "土曜"], ru: ["Камикоти", "Токусава", "суббота"], en: ["Kamikochi", "Tokusawa", "Saturday"] },
    title: {
      ja: "上高地・徳沢、土曜でもテントの杭は残っていた",
      ru: "Камикоти, Токусава: в субботу ещё оставались колышки под палатку",
      en: "Kamikochi, Tokusawa: tent stakes still free on a Saturday"
    },
    views: 986,
    created: daysAgo(4),
    posts: [
      {
        user: "aoki-natsu",
        at: daysAgo(4),
        likes: 31,
        body: {
          ja: "8月22日着。河童橋9:40。徳沢は11:20。指定地の西端、杭は三つ空いていた。水場は開。風は谷から14時過ぎ。焚火は禁止のまま。熊鈴は横尾まで鳴らした。",
          ru: "Пришла 22 августа. Каппа-баси в 9:40, Токусава в 11:20. На западном краю площадки свободны три кола. Вода открыта. Ветер из долины после двух. Костры по-прежнему нельзя. Колокольчик несла до Ёкоо.",
          en: "Arrived 22 Aug. Kappa Bridge 9:40, Tokusawa 11:20. Three stakes free on the west edge of the designated ground. Tap open. Valley wind after 14:00. Fires still banned. Bell on as far as Yokoo."
        }
      },
      {
        user: "helen-brooke",
        at: daysAgo(3),
        likes: 9,
        body: {
          ja: "I walked through the same afternoon. The east pads were full by 13:00. If you arrive on the first bus, west is quieter.",
          ru: "Я прошла тем же днём. Восточные площадки к часу уже заняты. Кто на первом автобусе — западнее тише.",
          en: "I walked through the same afternoon. The east pads were full by 13:00. If you arrive on the first bus, west is quieter."
        }
      },
      {
        user: "endo-kenji",
        at: hoursAgo(30),
        likes: 6,
        body: {
          ja: "横尾の小屋は22日夕食、残り2。電話は0263-95-2221。掲示板の数字は使わない。",
          ru: "Изба Ёкоо 22-го на ужин — два места. Телефон 0263-95-2221. Цифре с доски не верить.",
          en: "Yokoo hut, dinner on the 22nd: two left. Phone 0263-95-2221. Ignore a number copied from a board."
        }
      }
    ]
  },
  {
    id: "yakushima-pack",
    cat: "saho",
    img: "public/images/topics/yakushima.png",
    tags: { ja: ["屋久島", "白谷", "荷物"], ru: ["Якусима", "Сиратани", "рюкзак"], en: ["Yakushima", "Shiratani", "pack"] },
    title: {
      ja: "屋久島・白谷、苔の入口で荷物を減らす順番",
      ru: "Якусима, Сиратани: в каком порядке снимать вес до входа в мох",
      en: "Yakushima, Shiratani: what to drop before the moss gate"
    },
    views: 744,
    created: daysAgo(9),
    posts: [
      {
        user: "helen-brooke",
        at: daysAgo(9),
        likes: 22,
        body: {
          ja: "Rain cover on before the ticket hut. Extra water bottle stays in the car — the path is wet enough. Gaiters earn their weight. I left the stove; the rest shelter has no fire.",
          ru: "До будки с билетами — накидку на рюкзак. Лишнюю бутылку оставляю в машине: тропа и так мокрая. Гетры отрабатывают вес. Печку не несла: в навесе огня нет.",
          en: "Rain cover on before the ticket hut. Extra water bottle stays in the car — the path is wet enough. Gaiters earn their weight. I left the stove; the rest shelter has no fire."
        }
      },
      {
        user: "nishi-mio",
        at: daysAgo(7),
        likes: 11,
        body: {
          ja: "白谷のあと宮之浦で湯。泥は玄関の洗い場で落とす。宿の畳に入らない。",
          ru: "После Сиратани — баня в Мияноура. Грязь смываю у входа. На татами в носках с тропы не ступать.",
          en: "After Shiratani, a bath in Miyanoura. Mud comes off at the entrance wash. Do not step onto tatami in trail socks."
        }
      }
    ]
  },
  {
    id: "okutama-van",
    cat: "rindo",
    img: "public/images/topics/okutama.png",
    tags: { ja: ["奥多摩", "氷川", "車中泊"], ru: ["Окутама", "Хикава", "ночь в машине"], en: ["Okutama", "Hikawa", "van night"] },
    title: {
      ja: "奥多摩の林道、車中泊でトイレと熊鈴",
      ru: "Лесная дорога в Окутаме: ночёвка в машине, туалет и колокольчик",
      en: "Okutama forest road: sleeping in the car, toilets, bear bell"
    },
    views: 1204,
    created: daysAgo(6),
    posts: [
      {
        user: "sato-haru",
        at: daysAgo(6),
        likes: 40,
        body: {
          ja: "8月20日。氷川から林道、ゲートは17時閉。手前の広いところに軽を寄せた。夜間トイレは閉鎖。ポリ袋を二重。熊鈴は朝の歩き出しだけ。焚火はしていない。",
          ru: "20 августа. От Хикавы по лесной дороге, шлагбаум в 17:00. Встал на широком месте до него. Ночной туалет закрыт. Пакет в пакете. Колокольчик — только утром, когда пошёл пешком. Костра не было.",
          en: "20 Aug. Forest road from Hikawa; gate shuts 17:00. I pulled onto the wide spot before it. Night toilet locked. Double bag. Bell only when I walked out in the morning. No fire."
        }
      },
      {
        user: "mori-tadao",
        at: daysAgo(5),
        likes: 18,
        body: {
          ja: "今年の奥多摩、熊の目撃は氷川の北側に寄っている。食糧は車内、見える位置に置かない。",
          ru: "В этом году в Окутаме медведя чаще видят севернее Хикавы. Еду в машине, не на виду.",
          en: "This year’s Okutama bear sightings sit north of Hikawa. Food inside the car, not in view."
        }
      },
      {
        user: "irina-sokolova",
        at: hoursAgo(18),
        likes: 7,
        body: {
          ja: "С той же стороны дороги в прошлом году стояла. Туалет к утру не открывали. Воду лучше взять в посёлке.",
          ru: "С той же стороны дороги в прошлом году стояла. Туалет к утру не открывали. Воду лучше взять в посёлке.",
          en: "I stood on that same verge last year. The toilet was not open by morning. Take water in the village."
        }
      }
    ]
  },
  {
    id: "oze-boards",
    cat: "hut",
    img: "public/images/topics/oze.png",
    tags: { ja: ["尾瀬", "山の鼻", "木道"], ru: ["Одзе", "Яманосана", "настил"], en: ["Oze", "Yamanohana", "boardwalk"] },
    title: {
      ja: "尾瀬の山の鼻、湿原にテントは打てない",
      ru: "Одзе, Яманосана: на болоте палатку не ставят",
      en: "Oze, Yamanohana: no tents on the marsh"
    },
    views: 631,
    created: daysAgo(11),
    posts: [
      {
        user: "aoki-natsu",
        at: daysAgo(11),
        likes: 19,
        body: {
          ja: "木道は濡れて滑る。山の鼻の小屋は予約。湿原に杭を打たない。水場は小屋側。",
          ru: "Настил мокрый, скользит. Избу на Яманосане берут заранее. Колья в болото не бить. Вода — со стороны избы.",
          en: "The boards are wet and slip. Book the Yamanohana hut. Do not drive stakes into the marsh. Water is on the hut side."
        }
      },
      {
        user: "endo-kenji",
        at: daysAgo(10),
        likes: 8,
        body: {
          ja: "山の鼻は8月の週末、電話がつながりにくい。朝の一回で決める。",
          ru: "В августовские выходные до Яманосаны телефон плохо дозванивается. Решать с первой утренней попытки.",
          en: "On August weekends the Yamanohana phone is hard to reach. Settle it on the first morning call."
        }
      }
    ]
  },
  {
    id: "daisetsu-june",
    cat: "season",
    img: "public/images/topics/daisetsu.png",
    tags: { ja: ["大雪山", "層雲峡", "残雪"], ru: ["Дайсэцудзан", "Соункё", "снег"], en: ["Daisetsuzan", "Sōunkyō", "leftover snow"] },
    title: {
      ja: "大雪・層雲峡側、6月の残雪と新しい通行止め",
      ru: "Дайсэцудзан со стороны Соункё: июньский снег и новое перекрытие",
      en: "Daisetsuzan from Sōunkyō: June snow and a new closure"
    },
    views: 1580,
    created: daysAgo(20),
    posts: [
      {
        user: "irina-sokolova",
        at: daysAgo(20),
        likes: 44,
        body: {
          ja: "6月12日、黒岳から平。雪はまだ帯。アイゼンは短い斜面で使った。風は層雲峡から昼過ぎ。水は雪解け、濾した。",
          ru: "12 июня, от Куродакэ на плато. Снег ещё полосами. Кошки — на коротком склоне. Ветер от Соункё после полудня. Вода — талая, фильтровала.",
          en: "12 June, Kurodake onto the plateau. Snow still in bands. Crampons for one short slope. Wind from Sōunkyō after noon. Meltwater, filtered."
        }
      },
      {
        user: "mori-tadao",
        at: hoursAgo(6),
        likes: 21,
        body: {
          ja: "8月26日追記。層雲峡側の作業道、崩落で閉じた。黒岳ロープウェイは通常。避難小屋に頼らない人数で入ること。",
          ru: "26 августа. Рабочая дорога со стороны Соункё закрыта из-за осыпи. Канатная на Куродакэ ходит. В аварийную избу не закладываться числом.",
          en: "26 Aug addendum. The works road on the Sōunkyō side is closed after a slip. Kurodake ropeway runs. Do not count on the emergency hut for numbers."
        }
      },
      {
        user: "helen-brooke",
        at: hoursAgo(4),
        likes: 5,
        body: {
          ja: "I turned around at the closure sign. The plateau can wait. Thank you for writing the date on the paper, not only here.",
          ru: "Развернулась у щита. Плато подождёт. Спасибо, что дату написали и на бумаге, не только здесь.",
          en: "I turned around at the closure sign. The plateau can wait. Thank you for writing the date on the paper, not only here."
        }
      }
    ]
  },
  {
    id: "ishizuchi-bath",
    cat: "toji",
    img: "public/images/categories/toji.png",
    tags: { ja: ["石鎚", "西条", "下り"], ru: ["Исидзути", "Сайдзё", "спуск"], en: ["Ishizuchi", "Saijō", "descent"] },
    title: {
      ja: "石鎚の下り、西条の湯は膝が先に着く",
      ru: "Спуск с Исидзути: в Сайдзё колени приходят в баню раньше вас",
      en: "Down from Ishizuchi: in Saijō the knees reach the bath first"
    },
    views: 402,
    created: daysAgo(15),
    posts: [
      {
        user: "nishi-mio",
        at: daysAgo(15),
        likes: 16,
        body: {
          ja: "鎖場のあと西条へ。夜の一番湯は避ける。膝は翌朝まで熱い。宿は歩きの泥を知っている家を選んだ。",
          ru: "После цепей — в Сайдзё. Вечерний первый заход в воду пропускаю. Колени горят до утра. Ночлег — в доме, где знают грязь с тропы.",
          en: "After the chains, down to Saijō. I skip the first evening bath. Knees stay hot until morning. I stayed in a house that already knows trail mud."
        }
      },
      {
        user: "pavel-orlov",
        at: daysAgo(14),
        likes: 4,
        body: {
          ja: "В Сайдзё после хода лучше не искать «лучший онсэн», а дом, где можно долго сидеть в коридоре, пока ноги отходят.",
          ru: "В Сайдзё после хода лучше не искать «лучший онсэн», а дом, где можно долго сидеть в коридоре, пока ноги отходят.",
          en: "In Saijō after the walk I look less for the finest bath than for a house where you can sit in the corridor until the legs come back."
        }
      }
    ]
  },
  {
    id: "nara-satoyama",
    cat: "satoyama",
    img: "public/images/categories/satoyama.png",
    tags: { ja: ["奈良", "田原", "井戸"], ru: ["Нара", "Тавара", "колодец"], en: ["Nara", "Tawara", "well"] },
    title: {
      ja: "奈良・田原、日帰りの休み場と井戸",
      ru: "Нара, Тавара: дневной привал и колодец",
      en: "Nara, Tawara: a day rest and the well"
    },
    views: 318,
    created: daysAgo(8),
    posts: [
      {
        user: "pavel-orlov",
        at: daysAgo(8),
        likes: 12,
        body: {
          ja: "У храмовой ограды с юга есть камень, где сидят свои. В колодец кружку не макаю — воду берут соседи. Еду разворачиваю на своей ткани, крошки в карман.",
          ru: "У храмовой ограды с юга есть камень, где сидят свои. В колодец кружку не макаю — воду берут соседи. Еду разворачиваю на своей ткани, крошки в карман.",
          en: "South of the shrine fence there is a stone the locals already sit on. I do not dip a cup in the well — neighbours draw there. Food on my own cloth; crumbs in the pocket."
        }
      },
      {
        user: "sato-haru",
        at: daysAgo(2),
        likes: 3,
        body: {
          ja: "車は集落の入口の空きに。農道の突き当りは農作業の回転場。",
          ru: "Машину — на пустыре у входа в село. Тупик агродороги — разворот для техники.",
          en: "Park on the empty lot at the village entrance. The farm-road dead end is a turning circle for work."
        }
      }
    ]
  },
  {
    id: "shiretoko-close",
    cat: "season",
    img: "public/images/categories/season.png",
    tags: { ja: ["知床", "閉山", "熊"], ru: ["Сиретоко", "закрытие", "медведь"], en: ["Shiretoko", "closure", "bear"] },
    title: {
      ja: "知床、閉山前の一週間は熊の時間",
      ru: "Сиретоко: неделя до закрытия троп — медвежье время",
      en: "Shiretoko: the week before the trails shut is bear time"
    },
    views: 890,
    created: daysAgo(28),
    posts: [
      {
        user: "mori-tadao",
        at: daysAgo(28),
        likes: 37,
        body: {
          ja: "閉山の紙は山麓の掲示が先。鈴だけでは足りない週がある。食糧は車に戻す。一人では入らない。",
          ru: "Бумагу о закрытии сначала вешают у подножия. Бывают недели, когда одного колокольчика мало. Еду возвращаю в машину. В одиночку не захожу.",
          en: "The closure paper goes up at the foot first. Some weeks a bell is not enough. Food back in the car. I do not go in alone."
        }
      },
      {
        user: "irina-sokolova",
        at: daysAgo(21),
        likes: 10,
        body: {
          ja: "В прошлом октябре разворачивались на третьем километре: свежий помёт на тропе, ветер в спину. Жаль плато, но правильнее.",
          ru: "В прошлом октябре разворачивались на третьем километре: свежий помёт на тропе, ветер в спину. Жаль плато, но правильнее.",
          en: "Last October we turned at kilometre three: fresh scat on the path, wind at our backs. A pity about the plateau, and the right call."
        }
      }
    ]
  },
  {
    id: "fire-oil",
    cat: "saho",
    img: "public/images/categories/saho.png",
    tags: { ja: ["火", "油", "持ち帰り"], ru: ["огонь", "масло", "унести"], en: ["fire", "oil", "carry out"] },
    title: {
      ja: "許可地でも油は持ち帰ること",
      ru: "Даже где огонь можно — масло уносить с собой",
      en: "Even where fire is allowed, the oil comes home"
    },
    views: 521,
    created: daysAgo(18),
    posts: [
      {
        user: "endo-kenji",
        at: daysAgo(18),
        likes: 29,
        body: {
          ja: "指定の焚火台でも、残油を土に捨てない。缶は冷まして袋。吸い殻は自分のポケット。小屋の灰捨て場は宿泊者のもの。",
          ru: "Даже на отведённой жаровне масло в землю не лить. Банку остудить и в пакет. Окурки — в свой карман. Яма для золы у избы — для ночующих.",
          en: "Even on a designated fire pan, do not pour residual oil on the ground. Cool the tin, bag it. Butts in your own pocket. The hut ash pit belongs to overnight guests."
        }
      },
      {
        user: "aoki-natsu",
        at: daysAgo(16),
        likes: 8,
        body: {
          ja: "徳沢は焚火禁止。アルコールストーブの下に不燃布。",
          ru: "В Токусаве костры нельзя. Под спиртовку — негорючая ткань.",
          en: "Tokusawa bans fires. A non-burn cloth under the alcohol stove."
        }
      }
    ]
  },
  {
    id: "kumano-stone",
    cat: "river",
    img: "public/images/categories/river.png",
    tags: { ja: ["熊野", "北山川", "増水"], ru: ["Кумано", "Китаяма", "паводок"], en: ["Kumano", "Kitayama river", "rise"] },
    title: {
      ja: "北山川、座れる石は増水のあとに動く",
      ru: "Китаяма: камень, на котором сидели, после паводка уже другой",
      en: "Kitayama river: the sitting stone moves after a rise"
    },
    views: 277,
    created: daysAgo(13),
    posts: [
      {
        user: "nishi-mio",
        at: daysAgo(13),
        likes: 9,
        body: {
          ja: "8月の雨の翌日、いつもの石は水面下。上流の新しい洲に座った。取水は濁りが引いてから。",
          ru: "На следующий день после августовского дождя привычный камень был под водой. Села на новую косу выше. Воду брала, когда муть ушла.",
          en: "The day after August rain, the usual stone was under the surface. I sat on a new bar upstream. I took water after the cloud had gone."
        }
      }
    ]
  }
];

const STATS = {
  members: 412,
  topics: 1284,
  posts: 6110,
  founded: { ja: "2018年春", ru: "весна 2018", en: "spring 2018" }
};
