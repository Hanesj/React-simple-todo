const Search = ({ search, setSearch }) => {
	return (
		<>
			<input
				type='text'
				placeholder='Sökord'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</>
	);
};

export default Search;
