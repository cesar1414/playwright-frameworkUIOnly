import { test, expect } from '@playwright/test';
import { HomePage } from '../page/homePage';

test('Buscar en página de ejemplo', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await expect(homePage.title).toHaveText('Example Domain');
  //await homePage.search('Playwright');
});