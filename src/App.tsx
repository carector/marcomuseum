import { useEffect, useState } from 'react';
import './App.css';
import {
	AbsoluteCenter,
	Box,
	Button,
	Flex,
	For,
	Grid,
	GridItem,
	HStack,
	Image,
} from '@chakra-ui/react';
import { Provider } from './components/ui/provider';
import { ChevronRightIcon, ChevronLeftIcon, CloseIcon } from '@chakra-ui/icons';

import { type Firestore, doc, getDoc } from 'firebase/firestore';

const data = [
	{
		year: '2019',
		images: [
			{
				url: 'marchive/Snapchat-1828321928.jpg',
				comment: '',
				date: '2019',
			},
			{
				url: 'marchive/Snapchat-1878720354.jpg',
				comment: '',
				date: '2019',
			},
			{
				url: 'marchive/Snapchat-1751365845-ANIMATION.gif',
				comment: 'Vile Marco animation',
				date: '2019',
			},
			{
				url: 'marchive/Snapchat-1613336237.jpg',
				comment: '',
				date: '2019',
			},
			{
				url: 'marchive/Snapchat-1757670789.jpg',
				comment: '',
				date: '2019',
			},
			{
				url: 'marchive/Snapchat-1828321928.jpg',
				comment: '',
				date: '2019',
			},
		],
	},
	{
		year: '2020',
		images: [
			{
				url: 'marchive/Snapchat-1828321928.jpg',
				comment: '',
				date: '2020',
			},
			{
				url: 'marchive/Snapchat-1878720354.jpg',
				comment: '',
				date: '2020',
			},
			{
				url: 'marchive/Snapchat-1751365845-ANIMATION.gif',
				comment: '',
				date: '2020',
			},
			{
				url: 'marchive/Snapchat-1613336237.jpg',
				comment: '',
				date: '2020',
			},
			{
				url: 'marchive/Snapchat-1757670789.jpg',
				comment: '',
				date: '2020',
			},
			{
				url: 'marchive/Snapchat-1828321928.jpg',
				comment: '',
				date: '2020',
			},
		],
	},
];

// import ChakraCarousel from './components/custom/ChakraCarousel';

function App({ db }: { db: Firestore }) {
	const [gridOpen, setGridOpen] = useState(false);
	const [yearIndex, setYearIndex] = useState(0);
	const [imgIndex, setImgIndex] = useState(0);

	// Firebase DB setup
	useEffect(() => {
		async function init() {
			const docRef = doc(db, 'marcos', 'fZ9WXXFQLigAg7jtEe1F')
			const doc2 = await getDoc(docRef);
			if(doc2.exists())
				console.log(doc2.data());
		}
		init();
	}, []);

	return (
		<Provider>
			{!gridOpen && (
				<Flex gap="24">
					<Button
						onClick={() => {
							if (imgIndex == 0) {
								const newYear =
									(yearIndex - 1 + data.length) % data.length;
								setYearIndex(newYear);
								setImgIndex(data[newYear].images.length - 1);
							} else setImgIndex(imgIndex - 1);
						}}
					>
						<ChevronLeftIcon />
					</Button>
					<Flex gap="8" direction="column">
						<Box p="4">
							<h1>{data[yearIndex].images[imgIndex].date}</h1>
							<p>
								{yearIndex} {imgIndex}
							</p>
						</Box>
						<Image
							fit="contain"
							h="500px"
							src={data[yearIndex].images[imgIndex].url}
						></Image>
						<Box p="4">
							<h4>{data[yearIndex].images[imgIndex].comment}</h4>
						</Box>
						<Button onClick={() => setGridOpen(true)}>
							View grid
						</Button>
					</Flex>
					<Button
						onClick={() => {
							if (imgIndex == data[yearIndex].images.length - 1) {
								setImgIndex(0);
								setYearIndex((yearIndex + 1) % data.length);
							} else setImgIndex(imgIndex + 1);
						}}
					>
						<ChevronRightIcon />
					</Button>
				</Flex>
			)}
			{gridOpen && (
				<>
					<HStack>
						<h1>All Marcos</h1>
						<Button onClick={() => setGridOpen(false)}>
							<CloseIcon />
						</Button>
					</HStack>
					<Flex gap="8" direction="column">
						<For each={data}>
							{(item) => (
								<>
									<Box bgColor="orange" color="black" p="4">
										{item.year}
									</Box>
									<Grid
										templateColumns={`repeat(${4}, 1fr)`}
										gap="4"
									>
										{' '}
										{/* 2 for mobile devices seems to be good fit */}
										<For each={item.images}>
											{(item) => (
												<GridItem>
													<img
														style={{
															objectFit: 'cover',
															width: '180px',
															height: '180px',
															borderRadius: '5%',
														}}
														src={item.url}
													></img>
												</GridItem>
											)}
										</For>
									</Grid>
								</>
							)}
						</For>
					</Flex>
				</>
			)}
		</Provider>
	);
}

export default App;
