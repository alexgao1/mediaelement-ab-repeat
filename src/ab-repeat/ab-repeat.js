'use strict';

/**
 * A-B Repeat plugin
 *
 * This feature allows you right click on the time slider rail and set two markers, representing the "A" and "B" in A-B repeat/loop functionality.
 * When the current time of the player reaches marker B, it will loop back to marker A.
 * Right click on the time rail when both A-B markers are active to remove them.
 */


// Feature configuration
Object.assign(mejs.MepDefaults, {
	/**
	 * Default marker colors for A and B respectively
	 * @type {String[]}
	 */
	markerColors: ['#FF2D00', '#3235FF'],
	/**
	 * Default marker width
	 * @type {Number}
	 */
	markerWidth: 1
});

Object.assign(MediaElementPlayer.prototype, {
	
	markersAB: [null, null],
	
	nextModifiedMarker: 0, 
	
	/**
	 * Feature constructor.
	 *
	 * Always has to be prefixed with `build` and the name that will be used in MepDefaults.features list
	 * @param {MediaElementPlayer} player
	 * @param {HTMLElement} controls
	 * @param {HTMLElement} layers
	 * @param {HTMLElement} media
	 */
	buildabrepeat (player, controls, layers, media)  {
		let
			t = this,
			currentPos = -1
		;

		for (let i = 0, total = this.markersAB.length; i < total; i++) {
			const marker = document.createElement('span');
			marker.className = `${t.options.classPrefix}time-marker`;
			marker.style.background = t.options.markerColors[i] || '#E9BC3D';
			controls.querySelector(`.${t.options.classPrefix}time-total`).appendChild(marker);
			this.markersAB[i] = marker
		}

		this.slider.addEventListener('contextmenu', (ev) => {
			ev.preventDefault();
			if (this.nextModifiedMarker === this.markersAB.length) {
				this.nextModifiedMarker = 0
				this.resetmarkers()
			}
			else {
				const newTimePosition = mejs.Utils.timeCodeToSeconds(this.timefloatcurrent.innerHTML)
				if (this.nextModifiedMarker === 1) {
					const markerA = this.markersAB[this.nextModifiedMarker - 1];
					if (markerA.dataset && markerA.dataset.timeValue && this.getMarkerTime(markerA) > newTimePosition) return
				}
				this.setmarker(newTimePosition);
				this.nextModifiedMarker += 1
			}
		});

		media.addEventListener('durationchange', () => {
			this.resetmarkers();
		});
		
		media.addEventListener('timeupdate', () => {
			if (this.nextModifiedMarker !== this.markersAB.length) return
			currentPos = Math.floor(media.currentTime);
			const markerBTime = Math.floor(this.getMarkerTime(this.markersAB[1]));
			if (currentPos === markerBTime) {
				const markerATime = Math.floor(this.getMarkerTime(this.markersAB[0]));
				this.setCurrentTime(markerATime, false);
				this.setCurrentRailHandle(markerATime);
				this.updateCurrent(markerATime);
			}
		}, false);

	},
	/**
	 * Returns the time value stored in a marker if available
	 * @param {HTMLElement} marker
	 */
	getMarkerTime (marker) {
		return Number(marker.dataset.timeValue)
	},
	/**
	 * Resets A-B markers to hide
	 */
	resetmarkers () {
		for (let i = 0, total = this.markersAB.length; i < total; i++) {
			const marker = this.markersAB[i] ;
			marker.style.width = '0px';
			marker.style.left = 'auto';
			marker.dataset.timeValue = null;
			this.nextModifiedMarker = 0;
		}
	},
	/**
	 * Set marker position in the progress bar
	 *
	 * @param {Number} position
	 */
	setmarker (position)  {
		const modifyingMarker = this.markersAB[this.nextModifiedMarker];
		const left = 100 * Math.floor(position) / this.media.duration;
		modifyingMarker.style.width = this.options.markerWidth + 'px';
		modifyingMarker.style.left = `${left}%`;
		modifyingMarker.dataset.timeValue = position;
		this.slider.dispatchEvent(
			new CustomEvent('setmarker', {
				detail: {
					marker: this.nextModifiedMarker,
					position					
				}
			})
		);
	}
});