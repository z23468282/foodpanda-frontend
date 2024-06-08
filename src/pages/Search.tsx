import { useSearchRestaurants } from '@/api/Restaurant';
import PaginationSelector from '@/components/PaginationSelector';
import SearchBar, { SearchForm } from '@/components/SearchBar';
import SearchResultInfo from '@/components/SearchResultInfo';
import SearchResultsCard from '@/components/SearchResultsCard';
import FoodFilter from '@/components/FoodFilter';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import SortOptionDropdown from '@/components/SortOptionDropdown';

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedFoods: string[];
  sortOption: string;
};

const Search = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: '',
    page: 1,
    selectedFoods: [],
    sortOption: '最相關',
  });
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedFoods = (selectedFoods: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedFoods,
      page: 1,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: '',
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  if (!results?.data || !city) {
    return <span>未找到結果</span>;
  }

  if (isLoading) {
    <div className="flex justify-center items-center">
      <Loader2 className="animate-spin w-[100px] h-[100px] " />
    </div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-5">
      <div id="foods-list">
        <FoodFilter
          selectedFoods={searchState.selectedFoods}
          onChange={setSelectedFoods}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder={'按食物品項或餐廳名稱搜尋'}
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        {results.data.map((restaurant) => (
          <SearchResultsCard key={restaurant._id} restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Search;
