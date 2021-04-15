import React, { useState, useRef } from 'react';
import 'aframe';
import 'aframe-environment-component';
import { Entity } from 'aframe-react';

const colors = ['#D92B6A', '#9564F2', '#FFCF59'];

function App() {
	const [color, setColor] = useState(colors[0]);
	const fullScreenBtnRef = useRef(null);
	const handleClick = () => {
		setColor(colors[Math.floor(Math.random() * colors.length)]);
	};

	const toggleFullScreen = () => {
		console.log('toggleFullScreen');
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
		}
	};

	return (
		<>
			<button
				ref={fullScreenBtnRef}
				onClick={() => toggleFullScreen()}
				style={{
					position: 'fixed',
					bottom: 20,
					right: 100,
					width: 100,
					height: 50,
					zIndex: 999,
					backgroundColor: 'red',
					'&:hover': {
						backgroundColor: 'green',
					},
				}}
			/>
			<a-scene id='scene'>
				<a-assets>
					<img
						id='boxTexture'
						src='https://i.imgur.com/mYmmbrp.jpg'
						crossOrigin='anonymous'
					/>
					<img
						id='skyTexture'
						src='https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg'
						crossOrigin='anonymous'
					/>
					<img
						id='groundTexture'
						src='https://cdn.aframe.io/a-painter/images/floor.jpg'
						crossOrigin='anonymous'
					/>
				</a-assets>
				<Entity environment='preset: forest; dressingAmount: 500' />

				{/* <a-box
				src='#boxTexture'
				position='0 2 -5'
				rotation='0 45 0'
				scale='2 2 2'
				animation='property: object3D.position.y; to: 2.2; dir: alternate; dur: 2000; loop: true'
			></a-box> */}

				<Entity
					primitive='a-box'
					src='#boxTexture'
					color={color}
					position='0 2 -5'
					rotation='0 45 0'
					scale='2 2 2'
					animation='property: object3D.position.y; to: 2.2; dir: alternate; dur: 2000; loop: true'
					events={{ click: handleClick }}
				/>

				{/* Addind a sky */}
				{/* <a-sky src='#skyTexture'></a-sky> */}

				{/* Addind a ground */}
				{/* <Entity
				geometry={{ primitive: 'plane', width: 30, height: 30 }}
				material={{ src: '#groundTexture', repeat: '10 10' }}
				rotation='-90 0 0'
			/> */}

				<Entity primitive='a-light' type='ambient' color='#445451' />
				<Entity primitive='a-camera'>
					<Entity primitive='a-cursor' color='blue' />
				</Entity>
			</a-scene>
		</>
	);
}

export default App;
