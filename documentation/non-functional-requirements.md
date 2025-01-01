# Non-functional requirements

This document contains information about [non-functional requirements](https://en.wikipedia.org/wiki/Non-functional_requirement) for all the applications.

## Accessibility

### Resources

* [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22)
* [Accessible Rich Internet Applications (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2)

### Requirements

* WCAG 2.2 level AA
* WAI-ARIA 1.2

## Internationalization and localization

### Requirements

#### Supported languages

* English
* Russian

## Performance

### Resources

* [Largest Contentful Paint (LCP)](https://web.dev/articles/lcp)
* [Cumulative Layout Shift (CLS)](https://web.dev/articles/cls)
* [Interaction to Next Paint (INP)](https://web.dev/articles/inp)
* [How the Core Web Vitals metrics thresholds were defined](https://web.dev/articles/defining-core-web-vitals-thresholds)
* [Web Vitals](https://web.dev/articles/vitals)
* [The Science Behind Web Vitals](https://blog.chromium.org/2020/05/the-science-behind-web-vitals.html)
* [Recommended Web Performance Timings: How long is too long?](https://developer.mozilla.org/en-US/docs/Web/Performance/How_long_is_too_long)

### Requirements

* Largest Contentful Paint (LCP): less than or equal to 2.5 seconds
* Cumulative Layout Shift (CLS): less than or equal to 0.1
* Interaction to Next Paint (INP): less than or equal to 0.2 seconds

## Security

### Resources

* [JWT](https://jwt.io/introduction)
* [Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

### Requirements

#### Authorization

Email + password combination.

#### Authentication

Signed JWT sent via signed cookies.

## Testability

### Resources

* [Making Use of Code Coverage](https://www.epicweb.dev/making-use-of-code-coverage)
* [Mistake Number 2: 100% code coverage](https://kentcdodds.com/blog/common-testing-mistakes#mistake-number-2-100-codecoverage)
* [Code Coverage Best Practices](https://testing.googleblog.com/2020/08/code-coverage-best-practices.html)
* [Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)
* [Write tests. Not too many. Mostly end-to-end.](https://devsparks.goooseman.dev/hacks/20240615-why-e2e-tests)

### Requirements

#### Types of tests

* Static
* Unit
* Integration
* End-to-end

#### Coverage

* 100% when using own implementation
* 90%-100% when using 3d-party libraries (depends on the library)

## Usability

### Resources

* [Desktop Screen Resolution Stats Worldwide](https://gs.statcounter.com/screen-resolution-stats/desktop/worldwide)
* [The Benefits And Risks Of Dark Mode Web Design](https://namtheartist95.medium.com/the-benefits-and-risks-of-dark-mode-web-design-7292f10a6d5e)
* [Dark theme#Usage](https://m2.material.io/design/color/dark-theme.html#usage)

### Requirements

#### Minimal display resolution

1366px (width)  ×  768px (height) (least resolution with 10%+ users).

#### Supported browsers

* Latest Google Chrome version
* Latest Firefox version

#### Responsive design

Supported.

#### Dark color scheme

Supported.
