import {
	Box,
	Flex,
	For,
	Grid,
	GridItem,
} from '@chakra-ui/react';

const data = [
		{
			year: '2019',
			images: [
				{ url: 'marchive/Snapchat-1828321928.jpg' },
				{ url: 'marchive/Snapchat-1878720354.jpg' },
				{ url: 'marchive/Snapchat-1751365845-ANIMATION.gif' },
				{ url: 'marchive/Snapchat-1613336237.jpg' },
				{ url: 'marchive/Snapchat-1757670789.jpg' },
				{ url: 'marchive/Snapchat-1828321928.jpg' },
			],
		},
		{
			year: '2020',
			images: [
				{ url: 'marchive/Snapchat-1828321928.jpg' },
				{ url: 'marchive/Snapchat-1878720354.jpg' },
				{ url: 'marchive/Snapchat-1751365845-ANIMATION.gif' },
				{ url: 'marchive/Snapchat-1613336237.jpg' },
				{ url: 'marchive/Snapchat-1757670789.jpg' },
				{ url: 'marchive/Snapchat-1828321928.jpg' },
			],
		},
	];

function MarcoGrid() {
	return (
		<Flex gap="8" direction="column">
			<For each={data}>
				{(item) => (
					<>
						<Box bgColor="orange" color="black" p="4">
							{item.year}
						</Box>
						<Grid templateColumns={`repeat(${3}, 1fr)`} gap="4">
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
	);
}

export default MarcoGrid;