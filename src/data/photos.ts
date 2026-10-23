/*
  The client's own photographs (Media/extra-images), converted to WebP in two
  sizes: <key>.webp (up to 1600px wide) and <key>-sm.webp (720px).
  Generated — edit the alt text here freely; re-run the script only to add photos.
*/

export type Place = 'cpt' | 'grt' | 'kru' | 'pnr' | 'sun' | 'vic' | 'hwa' | 'east' | 'safari' | 'adventure' | 'travel'

export interface Photo {
  key: string
  place: Place
  alt: string
  w: number
  h: number
}

export const PHOTOS: Photo[] = [
  { key: 'cpt-boulders-seaboard', place: 'cpt', alt: "Granite boulders and turquoise water on Cape Town's Atlantic seaboard", w: 1280, h: 344 }, // banner.jpg
  { key: 'cpt-table-bay', place: 'cpt', alt: "Table Mountain seen across Table Bay", w: 1280, h: 344 }, // banner_capetown2.jpg
  { key: 'cpt-waterfront-mountain', place: 'cpt', alt: "Table Mountain rising behind the V&A Waterfront", w: 1280, h: 344 }, // banner_capetown3.jpg
  { key: 'safari-elephant-calves', place: 'safari', alt: "An elephant mother and her calves grazing", w: 1280, h: 344 }, // banner_elephant.jpg
  { key: 'safari-elephant-family', place: 'safari', alt: "An elephant family on the move", w: 1280, h: 344 }, // banner_elephants2.jpg
  { key: 'grt-mountain-pass', place: 'grt', alt: "A winding mountain pass on the coast", w: 1280, h: 344 }, // banner_gardenroute.jpg
  { key: 'grt-sandstone-cliffs', place: 'grt', alt: "Sandstone cliffs above the road", w: 1280, h: 344 }, // banner_gardenroute2.jpg
  { key: 'kru-young-lions', place: 'kru', alt: "Young lions resting on a rock", w: 1280, h: 344 }, // banner_lion.jpg
  { key: 'sun-lost-city-palace', place: 'sun', alt: "The Palace of the Lost City at Sun City", w: 822, h: 222 }, // banner_suncity.jpg
  { key: 'vic-falls-sunset', place: 'vic', alt: "Victoria Falls glowing at sunset", w: 1280, h: 344 }, // banner_vicfalls.jpg
  { key: 'vic-falls-viewpoint', place: 'vic', alt: "Victoria Falls from the rainforest viewpoints", w: 1099, h: 296 }, // banner_vicfalls2.jpg
  { key: 'safari-waterhole-mix', place: 'safari', alt: "Giraffe, zebra, springbok and elephants sharing a waterhole", w: 1600, h: 900 }, // mixedsafari.jpg
  { key: 'vic-main-falls', place: 'vic', alt: "The main falls at Victoria Falls", w: 1000, h: 668 }, // vicfalls_hd.jpg
  { key: 'cpt-waterfront', place: 'cpt', alt: "The V&A Waterfront beneath Table Mountain", w: 1600, h: 794 }, // cpt/africa-5210116_1920.jpg
  { key: 'cpt-bokaap-street', place: 'cpt', alt: "Colourful houses in the Bo-Kaap", w: 640, h: 480 }, // cpt/bokaap.jpg
  { key: 'cpt-cape-point-baboon', place: 'cpt', alt: "A baboon sitting on the Cape Point sign", w: 600, h: 400 }, // cpt/cape-point.jpg
  { key: 'cpt-city-aerial', place: 'cpt', alt: "Cape Town, Table Mountain and the stadium from the air", w: 1600, h: 1066 }, // cpt/cape-town-5109731_1920.jpg
  { key: 'cpt-boulders-penguins', place: 'cpt', alt: "African penguins at Boulders Beach", w: 600, h: 418 }, // cpt/capepeninsula.jpeg
  { key: 'cpt-twelve-apostles-dusk', place: 'cpt', alt: "The Twelve Apostles above Camps Bay at dusk", w: 1600, h: 778 }, // cpt/capetown.jpg
  { key: 'cpt-chapmans-peak-sign', place: 'cpt', alt: "Chapman's Peak Drive cut into the cliffs", w: 600, h: 472 }, // cpt/chapmans.jpg
  { key: 'cpt-chapmans-peak-road', place: 'cpt', alt: "Chapman's Peak Drive hugging the coastline", w: 600, h: 402 }, // cpt/chapmanspeak.jpg
  { key: 'travel-cpt-airport', place: 'travel', alt: "The terminal at Cape Town International Airport", w: 1600, h: 2134 }, // cpt/cpt_airport.jpg
  { key: 'travel-cpt-arrivals', place: 'travel', alt: "International arrivals at Cape Town International Airport", w: 1536, h: 1152 }, // cpt/cpt_airport2.jpeg
  { key: 'cpt-bokaap-aerial', place: 'cpt', alt: "The Bo-Kaap and Lion's Head from above", w: 1080, h: 1350 }, // cpt/cpt_bokaap.jpg
  { key: 'cpt-cableway-view', place: 'cpt', alt: "Lion's Head seen from the Table Mountain cableway", w: 592, h: 792 }, // cpt/cpt_cable_car.jpg
  { key: 'cpt-cable-car', place: 'cpt', alt: "The Table Mountain Aerial Cableway", w: 300, h: 300 }, // cpt/cpt_cable_car_2.jpg
  { key: 'cpt-cape-point-lighthouse', place: 'cpt', alt: "The old lighthouse at Cape Point", w: 740, h: 1150 }, // cpt/cpt_cape_point.jpg
  { key: 'cpt-city-centre', place: 'cpt', alt: "Cape Town city centre beneath Table Mountain", w: 746, h: 426 }, // cpt/cpt_city_view.jpg
  { key: 'cpt-good-hope-sign', place: 'cpt', alt: "The Cape of Good Hope sign", w: 527, h: 452 }, // cpt/cpt_good_hope.jpg
  { key: 'cpt-paragliding-tandem', place: 'cpt', alt: "Tandem paragliding above Cape Town", w: 490, h: 420 }, // cpt/cpt_para.jpg
  { key: 'cpt-paragliding-selfie', place: 'cpt', alt: "A tandem paraglider over the city", w: 626, h: 836 }, // cpt/cpt_paragliding.jpg
  { key: 'cpt-penguin-beach', place: 'cpt', alt: "Penguins on the beach at Boulders", w: 960, h: 1280 }, // cpt/cpt_penguins.jpg
  { key: 'cpt-robben-island-gateway', place: 'cpt', alt: "The Nelson Mandela Gateway to Robben Island", w: 936, h: 1280 }, // cpt/cpt_robben_island.jpg
  { key: 'safari-acacia-plains', place: 'safari', alt: "An acacia on the plains of a game reserve", w: 450, h: 664 }, // cpt/cpt_safari_elephants.jpg
  { key: 'cpt-sunset-cruise-toast', place: 'cpt', alt: "A champagne toast on a sunset cruise", w: 720, h: 960 }, // cpt/cpt_sunset_cruise.jpg
  { key: 'cpt-wine-tasting', place: 'cpt', alt: "Wine tasting in the Cape Winelands", w: 750, h: 1000 }, // cpt/cpt_wine_tasting.jpg
  { key: 'cpt-catamaran', place: 'cpt', alt: "A catamaran cruise off Camps Bay", w: 1252, h: 936 }, // cpt/cruise.jpg
  { key: 'cpt-camps-bay-view', place: 'cpt', alt: "Camps Bay and the Twelve Apostles", w: 400, h: 268 }, // cpt/dest-cpt-img1.jpg
  { key: 'cpt-camps-bay-beach', place: 'cpt', alt: "Camps Bay beach below the Twelve Apostles", w: 600, h: 400 }, // cpt/dest_cpt.jpg
  { key: 'adventure-paragliding-lagoon', place: 'adventure', alt: "Tandem paragliding over a lagoon", w: 466, h: 624 }, // cpt/paragliding.jpg
  { key: 'cpt-quad-bikes', place: 'cpt', alt: "Quad bikes on the sand dunes", w: 600, h: 430 }, // cpt/quad.jpg
  { key: 'cpt-quad-friends', place: 'cpt', alt: "Friends ready for a quad-bike adventure", w: 768, h: 1024 }, // cpt/quad_biking.jpg
  { key: 'cpt-robben-island', place: 'cpt', alt: "Robben Island, with Table Mountain across the bay", w: 1180, h: 788 }, // cpt/robbenisland.jpg
  { key: 'cpt-dune-quad', place: 'cpt', alt: "Quad biking across white sand dunes", w: 600, h: 376 }, // cpt/sanddunes.jpg
  { key: 'cpt-blouberg-sunset', place: 'cpt', alt: "Sunset over Table Mountain from Blouberg", w: 1600, h: 1066 }, // cpt/sunset-5004905_1920.jpg
  { key: 'cpt-tablecloth', place: 'cpt', alt: "Table Mountain's tablecloth of cloud", w: 1280, h: 608 }, // cpt/table-mountain-5101432_1280.jpg
  { key: 'cpt-city-bowl', place: 'cpt', alt: "Table Mountain above the city bowl", w: 1600, h: 1066 }, // cpt/table-mountain-5903491_1920.jpg
  { key: 'cpt-blouberg-beach', place: 'cpt', alt: "Table Mountain from Bloubergstrand", w: 1600, h: 904 }, // cpt/tablemountain.jpg
  { key: 'cpt-tasting-flight', place: 'cpt', alt: "A tasting flight in the Winelands", w: 600, h: 398 }, // cpt/wine.jpg
  { key: 'cpt-estate-tasting', place: 'cpt', alt: "Wine tasting at a Cape estate", w: 502, h: 336 }, // cpt/winetasting.png
  { key: 'grt-cape-agulhas', place: 'grt', alt: "The Cape Agulhas marker, where two oceans meet", w: 1125, h: 2000 }, // grt/cape_aghaulas_long.jpg
  { key: 'cpt-penguins-shore', place: 'cpt', alt: "Penguins on a Cape beach", w: 566, h: 640 }, // grt/cape_peninsula.jpg
  { key: 'cpt-coastal-road', place: 'cpt', alt: "The coastal road towards Lion's Head", w: 1183, h: 888 }, // grt/gardenroute.jpg
  { key: 'grt-lakes-lagoons', place: 'grt', alt: "Lakes and lagoons along the Garden Route", w: 1280, h: 346 }, // grt/gardenroute_main.jpg
  { key: 'grt-roadtrip-viewpoint', place: 'grt', alt: "A road-trip stop above the coast", w: 1600, h: 746 }, // grt/gardenroute_outdoor.jpg
  { key: 'grt-wild-coast', place: 'grt', alt: "Wild coastline on the Garden Route", w: 602, h: 348 }, // grt/gardenroute_view.jpg
  { key: 'grt-boat-sunset', place: 'grt', alt: "Watching the sun set from a boat", w: 491, h: 654 }, // grt/grt_boat_view.jpg
  { key: 'grt-cango-caves', place: 'grt', alt: "Inside the Cango Caves", w: 527, h: 450 }, // grt/grt_cango_caves.jpg
  { key: 'grt-cango-formations', place: 'grt', alt: "Dripstone formations in the Cango Caves", w: 750, h: 1024 }, // grt/grt_cangocaves.jpg
  { key: 'adventure-paragliding-coast', place: 'adventure', alt: "Tandem paragliding over the coast", w: 960, h: 1280 }, // grt/grt_paragliding.jpg
  { key: 'grt-storms-river-bridge', place: 'grt', alt: "The Storms River suspension bridge", w: 839, h: 598 }, // grt/grt_storms_river.jpg
  { key: 'grt-hermanus-whales', place: 'grt', alt: "Whale watching from the cliffs at Hermanus", w: 850, h: 568 }, // grt/hermanus.jpg
  { key: 'grt-hermanus-cliffs', place: 'grt', alt: "The cliff path at Hermanus", w: 768, h: 950 }, // grt/hermanus_long.jpg
  { key: 'grt-knysna-elephants', place: 'grt', alt: "Walking with elephants near Knysna", w: 536, h: 612 }, // grt/knysna_elephants.png
  { key: 'grt-knysna-heads', place: 'grt', alt: "The Knysna Heads", w: 438, h: 586 }, // grt/knysna_heads.png
  { key: 'grt-knysna-lagoon', place: 'grt', alt: "The lagoon mouth at Knysna", w: 667, h: 1000 }, // grt/knysna_heads_long.jpg
  { key: 'grt-oudtshoorn-ostriches', place: 'grt', alt: "Ostriches in Oudtshoorn", w: 375, h: 512 }, // grt/oudtshoorn_long.jpg
  { key: 'grt-tsitsikamma-waterfall', place: 'grt', alt: "A waterfall in the Tsitsikamma forest", w: 1095, h: 1460 }, // grt/storms_river.jpg
  { key: 'hwa-elephant-family', place: 'hwa', alt: "An elephant family in Hwange", w: 1034, h: 884 }, // hwa/hwa_elephants.jpg
  { key: 'hwa-lodge-waterhole', place: 'hwa', alt: "Elephants gathering at a lodge waterhole in Hwange", w: 1080, h: 720 }, // hwa/hwange_elephants.jpg
  { key: 'hwa-plains', place: 'hwa', alt: "Elephants crossing the plains of Hwange National Park", w: 1500, h: 1000 }, // hwa/hwange_park.jpg
  { key: 'kru-waterhole-herd', place: 'kru', alt: "Elephants drinking at a Kruger waterhole", w: 1200, h: 800 }, // kru/kru_banner_elephants.jpg
  { key: 'kru-elephant-family', place: 'kru', alt: "An elephant family at the water's edge", w: 1600, h: 536 }, // kru/kru_elephants.jpg
  { key: 'kru-river-crossing', place: 'kru', alt: "Elephants crossing a river in Kruger", w: 1197, h: 668 }, // kru/kru_elephants_crossing.png
  { key: 'kru-giraffe', place: 'kru', alt: "A giraffe in the bushveld", w: 600, h: 900 }, // kru/kru_giraffe.jpg
  { key: 'kru-giraffes', place: 'kru', alt: "Giraffes beneath the trees", w: 1273, h: 546 }, // kru/kru_giraffes.png
  { key: 'kru-leopard', place: 'kru', alt: "A leopard climbing a tree", w: 433, h: 650 }, // kru/kru_leopard.jpg
  { key: 'kru-three-lions', place: 'kru', alt: "Three male lions", w: 689, h: 590 }, // kru/kru_lions.jpg
  { key: 'kru-rhinos-dusk', place: 'kru', alt: "Two rhinos on a Kruger road at dusk", w: 1200, h: 800 }, // kru/kru_rhino.jpg
  { key: 'kru-lions-road', place: 'kru', alt: "Lions walking past a game-drive vehicle", w: 538, h: 460 }, // kru/kru_safari.jpg
  { key: 'pnr-blyde-couple', place: 'pnr', alt: "A couple overlooking the Blyde River Canyon", w: 918, h: 580 }, // kru/panorama_view.png
  { key: 'vic-falls-spray', place: 'vic', alt: "Spray rising from Victoria Falls", w: 1600, h: 848 }, // Originals/banner3.jpg
  { key: 'grt-coastal-roadtrip', place: 'grt', alt: "A road trip along the coast", w: 1600, h: 844 }, // Originals/banner6.jpg
  { key: 'sun-cheetahs', place: 'sun', alt: "Cheetahs resting in Pilanesberg", w: 1600, h: 1172 }, // pil/pil_cheetah.jpg
  { key: 'sun-elephant', place: 'sun', alt: "An elephant in Pilanesberg", w: 1600, h: 1202 }, // pil/pil_elephant.jpg
  { key: 'sun-rhino-calf', place: 'sun', alt: "A rhino and her calf in Pilanesberg", w: 1600, h: 1202 }, // pil/pil_hippo.jpg
  { key: 'sun-zebra-bush', place: 'sun', alt: "A zebra in the Pilanesberg bush", w: 1600, h: 1202 }, // pil/pil_zebra.jpg
  { key: 'pnr-blyde-dam', place: 'pnr', alt: "Blyde River Canyon and its dam", w: 1600, h: 640 }, // pnr/pnr_banner.jpg
  { key: 'pnr-rondavels-sunset', place: 'pnr', alt: "Sunset over the Three Rondavels", w: 1007, h: 668 }, // pnr/pnr_best_view.png
  { key: 'pnr-blyde-river', place: 'pnr', alt: "The Blyde River winding through the canyon", w: 673, h: 576 }, // pnr/pnr_gods_window.jpg
  { key: 'pnr-lisbon-falls', place: 'pnr', alt: "Lisbon Falls on the Panorama Route", w: 900, h: 1200 }, // pnr/pnr_lisbonfalls.jpg
  { key: 'pnr-rondavels-view', place: 'pnr', alt: "Taking in the view of the Three Rondavels", w: 1280, h: 540 }, // pnr/pnr_panner_gods_view.jpg
  { key: 'pnr-canyon-picnic', place: 'pnr', alt: "A picnic at the edge of the canyon", w: 1280, h: 854 }, // pnr/pnr_picnic_view.jpg
  { key: 'pnr-lowveld-sunset', place: 'pnr', alt: "Sunset over the Lowveld", w: 1012, h: 676 }, // pnr/pnr_sunset_view.png
  { key: 'pnr-canyon-above', place: 'pnr', alt: "Blyde River Canyon from above", w: 1024, h: 682 }, // pnr/pnr_view.jpg
  { key: 'pnr-canyon-couple', place: 'pnr', alt: "A couple at a Blyde River Canyon viewpoint", w: 436, h: 628 }, // pnr/pnr_view.png
  { key: 'east-savanna-sunset', place: 'east', alt: "Sunset over the savanna", w: 1600, h: 1070 }, // ser/africa-2042822_1920.jpg
  { key: 'east-elephant-portrait', place: 'east', alt: "An elephant on the open plains", w: 1294, h: 1920 }, // ser/africa-2042832_1920.jpg
  { key: 'east-fiery-sunset', place: 'east', alt: "A fiery sunset behind acacias", w: 1600, h: 1066 }, // ser/africa-6940244_1920.jpg
  { key: 'east-balloon-distant', place: 'east', alt: "A balloon drifting over the savanna", w: 1600, h: 1066 }, // ser/air-balloon-5251321_1920.jpg
  { key: 'east-gazelles', place: 'east', alt: "Two gazelles on the plains", w: 1600, h: 1070 }, // ser/antelope-2011367_1920.jpg
  { key: 'east-balloon-dawn', place: 'east', alt: "A hot-air balloon safari over green plains", w: 1600, h: 1070 }, // ser/balloon-75883_1920.jpg
  { key: 'east-buffalo', place: 'east', alt: "A Cape buffalo up close", w: 1280, h: 1920 }, // ser/buffalo-5325079_1920.jpg
  { key: 'east-dry-season', place: 'east', alt: "Zebras beneath an acacia in the dry season", w: 1600, h: 984 }, // ser/cheetahs-7813629_1920.jpg
  { key: 'east-elephants-acacias', place: 'east', alt: "Elephants beneath flat-topped acacias", w: 1600, h: 602 }, // ser/elephant-278374_1920.jpg
  { key: 'east-baby-elephant', place: 'east', alt: "A baby elephant following its mother", w: 1600, h: 830 }, // ser/elephants-7399479_1920.jpg
  { key: 'east-dust-bath', place: 'east', alt: "An elephant taking a dust bath", w: 1600, h: 900 }, // ser/elephants-7415245_1920.jpg
  { key: 'east-herd-calves', place: 'east', alt: "An elephant herd with calves", w: 1600, h: 900 }, // ser/elephants-7428344_1920.jpg
  { key: 'east-golden-plains', place: 'east', alt: "Elephants across golden grassland", w: 1600, h: 784 }, // ser/elephants-7435097_1920.jpg
  { key: 'east-giraffe-looking', place: 'east', alt: "A giraffe looking down", w: 1280, h: 1920 }, // ser/giraffe-3627613_1920.jpg
  { key: 'east-giraffe-acacia', place: 'east', alt: "A giraffe browsing an acacia", w: 1600, h: 1068 }, // ser/giraffe-5040122_1920.jpg
  { key: 'east-hippo-pool', place: 'east', alt: "Hippos crowded into a river pool", w: 1600, h: 900 }, // ser/hippopotamus-7521971_1920.jpg
  { key: 'east-lions-meal', place: 'east', alt: "A lion family sharing a meal", w: 1600, h: 900 }, // ser/lion-7473094_1920.jpg
  { key: 'east-male-lion', place: 'east', alt: "A male lion resting in the grass", w: 1600, h: 1012 }, // ser/lion-7490149_1920.jpg
  { key: 'east-maasai-men', place: 'east', alt: "Maasai men in traditional dress", w: 1600, h: 1070 }, // ser/maasai-men-6792090_1920.jpg
  { key: 'east-maasai-dance', place: 'east', alt: "The Maasai jumping dance", w: 1600, h: 898 }, // ser/maasai-tribe-83563_1920.jpg
  { key: 'east-mara-crossing', place: 'east', alt: "Wildebeest crossing the Mara River", w: 1600, h: 1066 }, // ser/mara-river-5730663_1920.jpg
  { key: 'east-maasai-spear', place: 'east', alt: "A Maasai man with a spear", w: 1282, h: 1920 }, // ser/masai-1330808_1920.jpg
  { key: 'east-ostrich', place: 'east', alt: "An ostrich, eye to eye", w: 1280, h: 1920 }, // ser/ostrich-3545069_1920.jpg
  { key: 'travel-plane-landing', place: 'travel', alt: "A flight coming in to land at sunset", w: 1389, h: 1920 }, // ser/plane-2260735_1920.jpg
  { key: 'travel-plane-overhead', place: 'travel', alt: "A plane passing overhead", w: 1195, h: 1920 }, // ser/plane-3425196_1920.jpg
  { key: 'east-rhino', place: 'east', alt: "A white rhino up close", w: 1280, h: 1920 }, // ser/rhino-3627622_1920.jpg
  { key: 'east-hippo-yawn', place: 'east', alt: "A hippo yawning in the river", w: 1600, h: 1066 }, // ser/safari-3242983_1920.jpg
  { key: 'east-zebra-herd', place: 'east', alt: "A herd of zebra on the plains", w: 1600, h: 900 }, // ser/safari-5645377_1920.jpg
  { key: 'east-bare-tree', place: 'east', alt: "A bare tree against a cloudy sky", w: 1440, h: 1920 }, // ser/tanzania-716336_1920.jpg
  { key: 'east-tanzania-sunset', place: 'east', alt: "The sun setting over Tanzania", w: 1600, h: 900 }, // ser/tanzania-7435138_1920.jpg
  { key: 'travel-terminal-wait', place: 'travel', alt: "Waiting for a flight at the terminal", w: 1239, h: 1920 }, // ser/terminal-1160262_1920.jpg
  { key: 'east-acacia-sunset', place: 'east', alt: "An acacia silhouetted at sunset", w: 1600, h: 900 }, // ser/tree-7431830_1920.jpg
  { key: 'east-maasai-beadwork', place: 'east', alt: "Maasai beadwork and dress", w: 1285, h: 1920 }, // ser/warrior-4371555_1920.jpg
  { key: 'east-waterbuck', place: 'east', alt: "A waterbuck", w: 1280, h: 1920 }, // ser/waterbuck-3551661_1920.jpg
  { key: 'east-zebra-wildebeest', place: 'east', alt: "Zebra and wildebeest sheltering under acacias", w: 1600, h: 900 }, // ser/wildebeests-7463289_1920.jpg
  { key: 'east-zebra-stripes', place: 'east', alt: "Zebra stripes up close", w: 1272, h: 1920 }, // ser/zebra-1883941_1920.jpg
  { key: 'east-zebra-facing', place: 'east', alt: "A zebra facing the camera", w: 1280, h: 1920 }, // ser/zebra-3242984_1920.jpg
  { key: 'east-zebra-foal', place: 'east', alt: "A zebra with her foal", w: 1280, h: 1920 }, // ser/zebra-3545113_1920.jpg
  { key: 'east-zebra-grazing', place: 'east', alt: "A zebra grazing", w: 1360, h: 1920 }, // ser/zebra-4340801_1920.jpg
  { key: 'east-lionesses-zebras', place: 'east', alt: "Lionesses watching zebras in the distance", w: 1600, h: 682 }, // ser/zebras-278084_1920.jpg
  { key: 'sun-giraffes', place: 'sun', alt: "Giraffes in Pilanesberg", w: 725, h: 482 }, // sun/Giraffe-Pilanesberg.jpg
  { key: 'sun-game-drive-lion', place: 'sun', alt: "A lion splashing past a game-drive vehicle", w: 500, h: 290 }, // sun/WhatsApp Image 2025-02-09 at 14.32.37_19b02c42.jpg
  { key: 'sun-lion-pair', place: 'sun', alt: "A lion and lioness", w: 600, h: 400 }, // sun/WhatsApp Image 2025-02-09 at 14.32.37_66dc6833.jpg
  { key: 'sun-cheetahs-rest', place: 'sun', alt: "Cheetahs at rest", w: 669, h: 446 }, // sun/WhatsApp Image 2025-02-09 at 14.32.38_99313810.jpg
  { key: 'sun-lions-vehicle', place: 'sun', alt: "Lions resting on a game-drive vehicle", w: 1280, h: 854 }, // sun/WhatsApp Image 2025-02-09 at 14.32.39_670b5f14.jpg
  { key: 'sun-zebra-bushveld', place: 'sun', alt: "A zebra in the bushveld", w: 1200, h: 800 }, // sun/WhatsApp Image 2025-02-09 at 14.32.42_b89b8bde.jpg
  { key: 'sun-quad-safari', place: 'sun', alt: "A quad-bike safari", w: 669, h: 446 }, // sun/WhatsApp Image 2025-02-09 at 14.32.42_f505b103.jpg
  { key: 'sun-elephant-family', place: 'sun', alt: "An elephant family in Pilanesberg", w: 1280, h: 824 }, // sun/WhatsApp Image 2025-02-09 at 14.32.43_ad4c5ffa.jpg
  { key: 'sun-buffalo-waterhole', place: 'sun', alt: "Buffalo gathering at a waterhole", w: 1400, h: 1050 }, // sun/caption.jpg
  { key: 'sun-lions-road', place: 'sun', alt: "Lions on the road in Pilanesberg", w: 1000, h: 668 }, // sun/pil_lions.jpg
  { key: 'sun-tubing', place: 'sun', alt: "Tubing at the Valley of Waves", w: 960, h: 500 }, // sun/sun_banner.jpg
  { key: 'sun-zebras-grazing', place: 'sun', alt: "Zebras grazing in Pilanesberg", w: 1280, h: 344 }, // sun/sun_banner1.jpg
  { key: 'sun-lost-city-elephants', place: 'sun', alt: "The elephant statues at the Lost City", w: 800, h: 500 }, // sun/sun_dest.jpg
  { key: 'sun-elephants-water', place: 'sun', alt: "Elephants drinking in Pilanesberg", w: 1200, h: 800 }, // sun/sun_elephants.jpg
  { key: 'sun-lost-city-night', place: 'sun', alt: "The Lost City lit up at night", w: 236, h: 326 }, // sun/sun_lights.jpg
  { key: 'sun-quad-riders', place: 'sun', alt: "Quad biking through the bush", w: 816, h: 698 }, // sun/sun_quadbike_safari.jpg
  { key: 'sun-water-slides', place: 'sun', alt: "Water slides at the Valley of Waves", w: 449, h: 384 }, // sun/sun_resort.jpg
  { key: 'sun-giraffes-zebras-road', place: 'sun', alt: "Giraffes and zebras crossing the road", w: 899, h: 340 }, // sun/sun_safari.jpg
  { key: 'sun-resort-aerial', place: 'sun', alt: "Sun City resort from above", w: 725, h: 482 }, // sun/sun_suncityresort.jpg
  { key: 'sun-valley-of-waves', place: 'sun', alt: "The Valley of Waves beach", w: 590, h: 390 }, // sun/sun_valleyofwaves.jpg
  { key: 'sun-lazy-river', place: 'sun', alt: "The lazy river at the Valley of Waves", w: 182, h: 278 }, // sun/sun_valleywaves.jpeg
  { key: 'sun-friends-tubing', place: 'sun', alt: "Friends floating on the lazy river", w: 800, h: 600 }, // sun/sun_watergirls.jpg
  { key: 'sun-slides-pools', place: 'sun', alt: "Water slides and pools at Sun City", w: 648, h: 550 }, // sun/sun_waterslide.jpg
  { key: 'vic-cultural-visit', place: 'vic', alt: "A cultural village visit near Victoria Falls", w: 669, h: 446 }, // vic/cultural_tour.jpg
  { key: 'vic-dinner-cruise', place: 'vic', alt: "A dinner cruise on the Zambezi", w: 1600, h: 726 }, // vic/dinner_cruise.jpg
  { key: 'vic-sunset-cruise', place: 'vic', alt: "A sunset cruise on the Zambezi River", w: 640, h: 428 }, // vic/sunset_cruise.jpg
  { key: 'vic-full-flow', place: 'vic', alt: "Victoria Falls in full flow", w: 672, h: 576 }, // vic/vic_falls_view.jpg
  { key: 'vic-falls-bridge-aerial', place: 'vic', alt: "Victoria Falls and the bridge from the air", w: 1257, h: 836 }, // vic/vicfalls.jpg
  { key: 'travel-vfa-airport', place: 'travel', alt: "Victoria Falls International Airport", w: 400, h: 400 }, // vic/vicfalls_airport.jpg
  { key: 'vic-falls-traveller', place: 'vic', alt: "Taking in the view at Victoria Falls", w: 900, h: 676 }, // vic/vicfalls_blackgirl.jpg
  { key: 'vic-gorge-aerial', place: 'vic', alt: "The gorge below Victoria Falls from the air", w: 1024, h: 358 }, // vic/vicfalls_home.jpg
  { key: 'travel-vfa-arrivals', place: 'travel', alt: "Arriving at Victoria Falls International Airport", w: 620, h: 330 }, // vic/victoria-falls-airport.jpg
]
