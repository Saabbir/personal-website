---
title: How to preview experiments in Webtrends Optimize
createdAt: 02/03/2026
publish: true
tags:
  - CRO
  - A/B Testing
  - Experimentation
  - Webtrends Optimize
---

<div class="l-wrap l-wrap--700">

## 3 ways we can preview experiments in Webtrends Optimize

- Using **Experiment Preview** section
- Using **Force Experiment Widget**
- Using query parameter **?_wt.mode=staging**

## Preview experiments using Experiment Preview section

1. Log in to Webtrends Optimize.
2. Go to Dashboard.
3. Click on the desired experiment from the list.
4. Move the content slider to the 4th item.
5. Now you'll see the Experiment Preview section like the below screenshot.
6. Copy desired variation link by clicking on the clipboard icon and preview it.
7. That's how to preview experiments using Webtrends default preview links.

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ijpwkbh23l63ahlo62vc.png)

## Preview experiments using Force Experiment Widget

1. Go to https://c.webtrends-optimize.com/acs/fxp/install.html
2. Drag and drop the **WTO Force Experiment** button to your bookmarks bar.
3. Visit the test page (target page where the variation will run).
4. Click/tap on the **WTO Force Experiment** bookmarklet.
5. It will open a popup from where you will be able to select your desired variation.

*NOTE:* You can paste the following code to the console to open the Force Experiment Widget.

```js [js]
javascript:function FXP(){var a="https://c.webtrends-optimize.com/acs/fxp",b="_wto.fxp";window[b+":cfg"]={debug:!1,insTS:"1627290085077",baseURL:a,instRef:"PROD"};var c=document.getElementById(b);if(c)window.WTOExp&&WTOExp.Run("bookmarklet");else{c=document.createElement("script"),c.id=b,c.src="https://c.webtrends-optimize.com/acs/fxp/wto_fxp.min.js";var d=document.body;c.onerror=function(){d.removeChild(c),alert("Error while loading WTO ForceExp. Try again.")},d&&d.appendChild(c)}}FXP();
```

## Preview experiments using the query parameter

- Add **?_wt.mode=staging** query parameter at the end of target URL to view the variation.

It will show the variation randomly, maybe variation 1, variation 2, or even control. If you have multiple variations and you want to view a specific variation all the time, then you have to set that up.

To do that, go to the dashboard, click on the desired experiment to open the content slider, and find the display dropdown at the bottom right corner of the 1st slide. See the screenshot below.

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/61u247yv5weth93x502i.png)

Clicking on that display select dropdown, a modal popup will open like the following screenshot.

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tokdzz7zjl3icg4x13yc.png)

Here you will see all the available variations you have for preview including control.

By default, variations are showing randomly but you can force it to display a specific variation by selecting the desired variation from here.

## Notes

If your test depends on other live/published tests, then ensure those tests are available in the staging mode otherwise the preview links won't work as expected.

## Further reading

- https://help.webtrends-optimize.com/optimize/qa/preview-experiments/


</div><!-- /.l-wrap--700 -->
