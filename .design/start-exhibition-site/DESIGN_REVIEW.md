# デザインレビュー：学生メディアアート展「stArt」Webサイト

確認基準：`DESIGN_BRIEF.md`  
デザイン哲学：Spatial Editorial Constellation  
実施日：2026-07-17

## 撮影した画面

| スクリーンショット | 画面幅 | 確認内容 |
| --- | --- | --- |
| `screenshots/review-home-desktop-1280.png` | Desktop（1280×800） | トップページ全体、情報階層、セクション間のリズム |
| `screenshots/review-home-tablet-768.png` | Tablet（768×1024） | トップページ全体、二列から一列への再構成 |
| `screenshots/review-home-mobile-375.png` | Mobile（375×812） | トップページ全体、ナビゲーション、文字組み |
| `screenshots/review-home-concept-desktop-1280.png` | Desktop（1280×800） | コンセプトへ移動した際の横移動、注目星、本文の可読性 |
| `screenshots/review-home-concept-mobile-375.png` | Mobile（375×812） | 狭幅での横移動、注目星、本文の可読性 |
| `screenshots/review-home-access-mobile-375.png` | Mobile（375×812） | アクセス情報と地図、星景との重なり |
| `screenshots/review-works-desktop-1280.png` | Desktop（1280×800） | 作品一覧、3列グリッド、背景の連続性 |
| `screenshots/review-works-tablet-768.png` | Tablet（768×1024） | 作品一覧、2列グリッド |
| `screenshots/review-works-mobile-375.png` | Mobile（375×812） | 作品一覧、1列グリッド、タップ領域 |
| `screenshots/review-work-detail-desktop-1280.png` | Desktop（1280×800） | 作品詳細、主画像、メタデータ、前後導線 |
| `screenshots/review-work-detail-tablet-768.png` | Tablet（768×1024） | 作品詳細の中間幅での再構成 |
| `screenshots/review-work-detail-mobile-375.png` | Mobile（375×812） | 作品詳細の一列化、長文、復帰導線 |

> すべての画像は `.design/start-exhibition-site/screenshots/` に保存している。

## 総評

情報を静的に縦へ並べる展示サイトから、縦スクロールで星図の中を左右へ移動する体験へ更新できている。常駐する星景、注目星、各セクション、別ルートの到着方向が一つの空間モデルでつながり、メディアアート展らしい操作感を持ちながら、会期・会場・アクセスの読みやすさも維持している。

## 必須修正

なし。自動検査と各画面幅の目視確認で、公開を妨げる機能・レイアウト・アクセシビリティ上の問題は確認されなかった。

## 推奨修正

1. **最終ポスターとの接続**：現在の青緑の星雲は、背景素材が未確定な段階の完成度を担保する仮表現である。ポスター完成後に `src/styles/tokens.css` の星雲色と背景アセット設定を調整し、移動モデルとHTMLテキストは維持する。
2. **実機での負荷確認**：Canvasの星、接続線、ぼかしを抑制した実装だが、低性能な実機での長時間表示は未確認である。公開前にiOS SafariとAndroid Chromeでスクロールの滑らかさと発熱を確認し、必要なら星の数とぼかし量を端末条件で下げる。

## 改善候補

1. **作品公開後の視覚リズム**：現在はCSSプレースホルダーを前提に構成している。実画像が揃った時点で、画像ごとの明度差を確認し、作品名の余白やグリッドの比率を最終調整すると一覧の完成度をさらに上げられる。
2. **印刷表示**：画面体験としては成立しているが、印刷用途が必要になった場合は星景と横移動を解除する `@media print` を追加すると案内ページとして再利用しやすい。

## 良好な点

- Heroでは展示名、会期、`筑波大学 春日エリア / 7A101 / 7A202 / 7A207` が最初の視線で把握でき、演出より情報が後退していない。
- `StarJourney` が縦位置を連続した横方向のカメラ位置へ変換するため、単発のスライド演出ではなく「次の星へ移動する」感覚になっている。
- `InteractiveStarfield` を共通レイアウトに置いたことで、トップ、作品一覧、作品詳細が同じ空間内の別地点として感じられる。
- 375pxでは一列、768pxでは二列、1280px以上では三列へ再構成され、単なる縮小表示になっていない。
- 背景、装飾、文字、コンテンツが分離され、ポスター素材や正式ロゴを後から差し替えられる。
- キーボード操作、フォーカス表示、モバイルメニュー、`prefers-reduced-motion`、画像なし・長文・不正URLの状態が実装されている。

## 検証結果

- `npm run typecheck`：成功
- `npm run lint`：成功
- `npm test`：10件成功
- `npm run build`：成功
- `npm run test:e2e`：31件成功、画面幅に該当しないモバイルメニュー検証2件は想定どおりスキップ
- Playwright：375px、768px、1440pxで横スクロールなし、主要遷移、スクロール移動、戻る導線を確認
- axe-core：WCAG 2.0／2.1 A・AA対象の重大な違反なし

---

## 追補：日本語タイポグラフィレビュー

実施日：2026-07-17  
対象：トップ、作品一覧、作品詳細の日本語本文・見出し・補助情報

### 追加撮影

| スクリーンショット | 確認内容 |
| --- | --- |
| `screenshots/typography-review-home-mobile-375.png` | Heroを含むトップ全体、375px |
| `screenshots/typography-review-home-tablet-768.png` | Heroを含むトップ全体、768px |
| `screenshots/typography-review-home-desktop-1280.png` | Heroを含むトップ全体、1280px |
| `screenshots/typography-review-concept-mobile-375.png` | コンセプト本文の改行と文字密度、375px |
| `screenshots/typography-review-concept-desktop-1280.png` | コンセプト本文の改行と文字密度、1280px |
| `screenshots/typography-review-information-mobile-375.png` | 会期・会場・主催、375px |
| `screenshots/typography-review-information-desktop-1280.png` | 会期・会場・主催、1280px |
| `screenshots/typography-review-access-mobile-375.png` | アクセス見出しと住所、375px |
| `screenshots/typography-review-access-desktop-1280.png` | アクセス見出しと住所、1280px |
| `screenshots/typography-review-works-mobile-375.png` | 作品一覧の見出し・作品名、375px |
| `screenshots/typography-review-works-tablet-768.png` | 作品一覧の見出し・作品名、768px |
| `screenshots/typography-review-works-desktop-1280.png` | 作品一覧の見出し・作品名、1280px |
| `screenshots/typography-review-detail-mobile-375.png` | 作品説明・メタデータ、375px |
| `screenshots/typography-review-detail-tablet-768.png` | 作品説明・メタデータ、768px |
| `screenshots/typography-review-detail-desktop-1280.png` | 作品説明・メタデータ、1280px |

### 結論

`IBM Plex Sans JP` は実画面で正常に読み込まれており、フォントの読み込み失敗やフォールバックが主因ではない。読みにくさは、日本語の文節を考慮しない改行、表示用大文字へ本文用の広い行間を適用していること、12pxの日本語ラベルへ0.14emの字間を設定していることから生じている。

### 必須修正

なし。現状でも情報の欠落、文字の重なり、横方向のオーバーフロー、WCAG AAの重大なコントラスト違反は確認されなかった。

### 優先して直したい点

1. **日本語の意味を分断する改行**：コンセプトで「千｜者万別」、アクセスで「徒｜歩約10分」、作品説明で「仮テキ｜スト」のような改行が発生している。`Sections.module.css`、`UtilitySections.module.css`、`Pages.module.css`、`WorkDetail.module.css` に、日本語本文向けの `line-break: strict` と、対応ブラウザ向けの `word-break: auto-phrase`／`text-wrap: pretty` を段階的に導入する。アクセス見出しなど短い重要文は `text-wrap: balance` または意味単位のspanで確実に制御する。参照：`typography-review-concept-desktop-1280.png`、`typography-review-access-desktop-1280.png`、`typography-review-detail-mobile-375.png`。
2. **コンセプト本文が細く、行間が広すぎる**：最大34pxの日本語へweight 300、line-height 1.85を組み合わせており、一文字ごとの存在感が弱い一方で行同士が離れて見える。本文書体は維持し、weight 400、line-height 1.6〜1.7、letter-spacing 0〜0.015emを基準に再調整する。参照：`typography-review-concept-mobile-375.png`、`typography-review-concept-desktop-1280.png`。
3. **小さな日本語ラベルの字間が広い**：「会期」「会場」「主催」などを12px、letter-spacing 0.14emで表示しており、短い日本語が記号のように分散して見える。数字インデックスは12pxのまま維持し、日本語ラベルは13〜14px、letter-spacing 0.04〜0.08emへ分ける。必要なら文字色もtertiaryからsecondaryへ一段上げる。参照：`typography-review-information-mobile-375.png`、`typography-review-detail-mobile-375.png`。
4. **`overflow-wrap: anywhere` の適用範囲が広い**：作品名、説明、メタデータ、前後作品名で、英単語・技術名・仮名のまとまりまで任意位置で分割できる。長いURL対策が必要な箇所だけへ限定し、通常文は `overflow-wrap: break-word` と日本語改行規則へ委ねる。

### 次に整えたい点

1. **欧文monoと日本語の混植**：作品一覧の「01 — 作品」は要素全体がSFMono指定のため、日本語部分だけ別フォントへフォールバックする。番号と日本語ラベルを別要素へ分けるか、全体を本文書体にして数字だけ `font-variant-numeric: tabular-nums` にすると、ベースラインと太さが揃う。参照：`typography-review-works-tablet-768.png`。
2. **日付の意味単位**：現在の幅では会期を一行表示できているが、日付文字列は任意の日本語位置で折り返せる。開始日、ダッシュ、終了日をspanへ分け、各日付内では不自然に折り返さない構造にすると、将来の文言変更にも強い。
3. **行間トークンの用途分離**：現在の `--line-height-relaxed: 1.85` をコンセプト、ページ導入文、作品説明で共用している。表示文、通常本文、補助文の三段階へ分けると、日本語のサイズに応じた密度を保ちやすい。

### 維持したい点

- `Syne` は展示名と数字中心のプレースホルダーだけに使われ、日本語本文へ混入していない。
- 作品一覧の作品名はweight 500で十分な太さがあり、375pxでも長い仮タイトルを読み取れる。
- Heroの会期・会場は本文より明確に強く、最初に必要な情報を把握しやすい。
- 本文色と背景色のコントラストは保たれており、改善の中心は色変更ではなく日本語の改行と文字密度である。

### 対応記録

2026-07-17：文節単位の改行、コンセプトの太さと行間、日本語ラベルの字間、`overflow-wrap` の範囲、monoと日本語の混植を修正した。トップの補足文、作品一覧の仮データ説明、作品詳細のレイアウト確認用文章も画面から削除し、375px・768px・1280pxで再確認した。
