import { FormzPage } from './app.po';

describe('formz App', function() {
  let page: FormzPage;

  beforeEach(() => {
    page = new FormzPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
