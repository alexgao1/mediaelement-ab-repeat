
# mediaelement-ab-repeat
Based on the existing [MediaElement Markers plugin](https://github.com/mediaelement/mediaelement-plugins/blob/master/docs/markers.md).  
Allows for looping a certain segment of media by setting two markers, A and B.
  
Right click on the time slider rail to set the markers, which represent the start and end points of the segment to be looped. If both markers are set, right click one more time to reset them.
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

