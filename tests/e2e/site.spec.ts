import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('トップで展示名・会期・会場を確認でき、横スクロールしない', async ({
  page,
}) => {
  await page.goto('./#/')

  await expect(page.getByRole('heading', { level: 1, name: 'stArt' })).toBeVisible()
  await expect(page.getByText('2026年7月29日（水）—31日（金）').first()).toBeVisible()
  await expect(page.getByText('筑波大学 春日エリア').first()).toBeVisible()
  await expect(page.getByText('7A101').first()).toBeVisible()
  await expect(page.locator('[data-work-marquee]')).toBeVisible()
  await expect(page.locator('[data-marquee-row]')).toHaveCount(2)
  await expect(
    page.locator('#works').getByText('展示作品（仮）01', { exact: true }),
  ).toHaveCount(0)
  await expect(
    page.getByText(/制作を始めた一人ひとりの試み/),
  ).toHaveCount(0)
  await expect(
    page.getByText('公開準備中の仮データを使って、作品の並び方を確認しています。'),
  ).toHaveCount(0)
  await expect(
    page.getByRole('navigation', { name: 'メインナビゲーション' })
      .getByRole('link', { name: 'SNS' }),
  ).toHaveCount(0)
  await expect(
    page.getByRole('navigation', { name: '展示を星で移動' }),
  ).toHaveCount(0)
  await expect(page.getByText('GENERATIVE CONSTELLATION')).toHaveCount(0)
  await expect(page.getByRole('img', { name: 'X（準備中）' })).toBeVisible()
  await expect(
    page.getByRole('img', { name: 'Instagram（準備中）' }),
  ).toBeVisible()
  await expect(page).toHaveTitle('stArt｜学生メディアアート展')

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)
})

test('別ページのナビゲーションから開催情報へ移動できる', async ({
  page,
}, testInfo) => {
  await page.goto('./#/works')

  if (testInfo.project.name === 'mobile-375') {
    await page.getByRole('button', { name: 'メニュー' }).click()
    await page
      .getByRole('dialog', { name: 'メニュー' })
      .getByRole('link', { name: /開催情報/ })
      .click()
  } else {
    await page
      .getByRole('navigation', { name: 'メインナビゲーション' })
      .getByRole('link', { name: '開催情報' })
      .click()
  }

  await expect(page).toHaveURL(/#\/\?section=information$/)
  await expect(page.locator('#information')).toBeFocused()
  await expect(page.getByRole('heading', { name: '開催情報' })).toBeVisible()
})

test('作品一覧・詳細・前後移動・一覧復帰が機能する', async ({ page }) => {
  await page.goto('./#/works')
  await expect(page.locator('[data-route-scene]')).toHaveAttribute(
    'data-route-direction',
    'forward',
  )
  const firstWork = page.getByRole('link', { name: /展示作品（仮）01/ }).first()
  await expect(firstWork).toBeVisible()
  await firstWork.click()

  await expect(page).toHaveURL(/#\/works\/display-sample-01$/)
  await expect(page.locator('[data-route-scene]')).toHaveAttribute(
    'data-route-direction',
    'backward',
  )
  await expect(
    page.getByRole('heading', { level: 1, name: '展示作品（仮）01' }),
  ).toBeVisible()
  await expect(
    page.getByRole('img', { name: /作品画像は準備中です/ }),
  ).toBeVisible()

  await page.getByRole('link', { name: /次の作品/ }).click()
  await expect(page).toHaveURL(/#\/works\/display-sample-02$/)
  await page.getByRole('link', { name: '← 作品一覧へ戻る' }).click()
  await expect(page).toHaveURL(/#\/works$/)
})

test('存在しない作品から一覧へ復帰できる', async ({ page }) => {
  await page.goto('./#/works/not-published')

  await expect(
    page.getByRole('heading', { name: '作品が見つかりません' }),
  ).toBeVisible()
  await page.getByRole('link', { name: '作品一覧へ戻る' }).click()
  await expect(page).toHaveURL(/#\/works$/)
})

test('モバイルメニューはEscapeで閉じ、開閉ボタンへフォーカスを戻す', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-375')

  await page.goto('./#/')
  const menuButton = page.getByRole('button', { name: 'メニュー' })
  await menuButton.click()
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByRole('dialog', { name: 'メニュー' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  await expect(menuButton).toBeFocused()
})

test('トップページに重大なWCAG A・AA違反がない', async ({ page }) => {
  await page.goto('./#/')
  await expect(page.getByRole('heading', { name: 'コンセプト' })).toBeAttached()

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()

  expect(results.violations).toEqual([])
})

test('長い作品名と説明でも横スクロールしない', async ({ page }) => {
  await page.goto('./#/works/display-sample-01')

  await page.getByRole('heading', { level: 1 }).evaluate((element) => {
    element.textContent = '展示作品（仮）とても長い作品名'.repeat(8)
  })
  await page.getByText('作品説明（仮）').evaluate((element) => {
    element.textContent = '作品説明（仮）。'.repeat(30)
  })

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)
})

test('スキップリンクで現在ルートを保ったまま本文へ移動できる', async ({
  page,
}) => {
  await page.goto('./#/works')
  await page.keyboard.press('Tab')

  const skipLink = page.getByRole('link', { name: '本文へ移動' })
  await expect(skipLink).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  await expect(page).toHaveURL(/#\/works$/)
})

test('上方向へスクロールすると先頭へ戻るボタンが現れる', async ({ page }) => {
  await page.goto('./#/')
  const backToTop = page.locator('button[aria-label="ページの先頭へ戻る"]')

  await expect(backToTop).toHaveAttribute('aria-hidden', 'true')
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(100)
  await page.mouse.wheel(0, -600)

  await expect(backToTop).toHaveAttribute('aria-hidden', 'false')
  await page.mouse.wheel(0, 200)
  await expect(backToTop).toHaveAttribute('aria-hidden', 'true')
  await page.mouse.wheel(0, -200)
  await expect(backToTop).toHaveAttribute('aria-hidden', 'false')
  await backToTop.click()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2)
})

test('スクロールで次の星と星雲へ移動できる', async ({ page }) => {
  await page.goto('./#/')

  await expect(page.locator('html')).toHaveClass(/starJourneyEnabled/)
  await expect(page.locator('[data-journey-stop]')).toHaveCount(5)

  const track = page.locator('[data-journey-track]')
  const starfield = page.locator('[data-interactive-starfield-root]')
  const informationPanel = page.locator('#information')
  const initialTransform = await track.evaluate(
    (element) => getComputedStyle(element).transform,
  )
  const initialPanelShift = await informationPanel.evaluate((element) =>
    element.style.getPropertyValue('--journey-panel-x'),
  )

  await informationPanel.evaluate((element) =>
    element.scrollIntoView({ block: 'start' }),
  )

  await expect(informationPanel).toHaveAttribute(
    'data-journey-active',
    'true',
  )
  await expect(starfield).toHaveAttribute('data-nebula-section', '2')
  await expect
    .poll(() =>
      track.evaluate((element) => getComputedStyle(element).transform),
    )
    .not.toBe(initialTransform)
  await expect
    .poll(() =>
      informationPanel.evaluate((element) =>
        element.style.getPropertyValue('--journey-panel-x'),
      ),
    )
    .not.toBe(initialPanelShift)
})

test('生成的な星空がポインター位置へ反応する', async ({ page }) => {
  await page.goto('./#/')

  const starfield = page.locator('[data-interactive-starfield-root]')
  const canvas = page.locator('[data-interactive-starfield]')
  await expect(page.locator('[data-nebula-atmosphere]')).toBeAttached()
  await expect(canvas).toBeAttached()
  await expect
    .poll(() =>
      canvas.evaluate((element: HTMLCanvasElement) => element.width),
    )
    .toBeGreaterThan(0)
  await expect
    .poll(() =>
      canvas.evaluate((element: HTMLCanvasElement) => element.height),
    )
    .toBeGreaterThan(0)

  await page.mouse.move(123, 234)
  await expect
    .poll(() =>
      starfield.evaluate((element) =>
        element.style.getPropertyValue('--nebula-pointer-x'),
      ),
    )
    .not.toBe('0px')
  await page.mouse.click(123, 234)
})
