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
//import { ChevronRightIcon, ChevronLeftIcon, CloseIcon } from '@chakra-ui/icons';

import {
	type Firestore,
	doc,
	collection,
	getDoc,
	getDocs,
} from 'firebase/firestore';

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

function toDateTime(secs: number) {
	var date = new Date(1970, 0, 1); // Epoch
	date.setSeconds(secs);
	return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
}

function App({ db }: { db: Firestore }) {
	const [gridOpen, setGridOpen] = useState(false);
	//const [yearIndex, setYearIndex] = useState(0);
	const [imgIndex, setImgIndex] = useState(0);
	const [imgData, setImgData] = useState<ReadonlyArray<any>>([]); // TODO create marco metadata interface

	// Firebase DB setup
	useEffect(() => {
		async function init() {
			const docs = await getDocs(collection(db, 'marcos'));
			let list: Array<any> = [];
			docs.forEach((doc) => list.push(doc.data()));
			console.log(list);
			setImgData(list);
			// if (docs.size != 0) {
			// 	console.log(docs.toJSON());
			// 	setImgData(docs.toJSON());
			// } else console.log('Error!');
		}
		init();
	}, []);

	if (imgData.length == 0) {
		return <h1>We outta tires</h1>;
	}

	return (
		<Provider>
			{!gridOpen && (
				<Flex gap="24">
					<Button
						onClick={() => {
							setImgIndex(
								(imgIndex - 1 + imgData.length) % imgData.length
							);
						}}
					>
						Left
						{/* <ChevronLeftIcon /> */}
					</Button>
					<p>{imgIndex}</p>
					<Flex gap="8" direction="column">
						<Box p="4">
							<h1>
								{toDateTime(imgData[imgIndex].date.seconds)}
							</h1>
						</Box>
						<Image
							fit="contain"
							h="500px"
							src={imgData[imgIndex].url}
						></Image>
						<Box p="4">
							<h4>{imgData[imgIndex].comment}</h4>
						</Box>
						<Button onClick={() => setGridOpen(true)}>
							View grid
						</Button>
					</Flex>
					<Button
						onClick={() => {
							setImgIndex((imgIndex + 1) % imgData.length);
						}}
					>
						Right
						{/* <ChevronRightIcon /> */}
					</Button>
				</Flex>
			)}
			{gridOpen && (
				<>
					<HStack>
						<h1>All Marcos</h1>
						<Button onClick={() => setGridOpen(false)}>
							Close {/* <CloseIcon /> */}
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
