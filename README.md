
# mediaelement-ab-repeat
Based on the existing [MediaElement Markers plugin](https://github.com/mediaelement/mediaelement-plugins/blob/master/docs/markers.md).  
Allows for looping a certain segment of media by setting two markers, A and B.
  
Right click on the time slider rail to set the markers, which represent the start and end points of the segment to be looped. If the current media time reaches marker B, it will return to marker A. If both markers are set, right click one more time to reset them.

# Demo
Download and view [demo.html](demo.html) within your browser.

# Usage
Include either the minifed version or regular version of the plugin in a script tag.
```html
<script src="src/ab-repeat/ab-repeat.min.js"></script>
```
Configuration options
```javascript
{
    markerColors: ['#FF2D00', '#3235FF'],
    markerWidth: 1,
    features: [..., 'abrepeat'],
}
```
# Event
When a marker is set, a custom event is dispatched from the slider element.  
The element is named `setmarker` and its detail will contain two properties.
  
  
|marker|position|
|--|--|
|0 or 1 (representing either marker A or marker B)|the time in seconds (the result of [mejs.Utils.timeCodeToSeconds](https://github.com/mediaelement/mediaelement/blob/master/docs/utils.md#time))|


