import React from 'react'
import ReactDOM from 'react-dom/client'
import {MainPage} from './pages/MainPage'
import './app.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {PAGES} from './constants'
import {DetailPage} from './pages/DetailPage'
import {LoaderFullScreen} from "./components/LoaderFullScreen";

const router = createBrowserRouter([
	{
		path: PAGES.HOME,
		element: <MainPage />,
	},
	{
		path: PAGES.NEWS_DETAIL,
		element: <DetailPage />,
	},
])

const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider
				router={router}
				fallbackElement={<LoaderFullScreen/>}
			/>
		</QueryClientProvider>
	</React.StrictMode>,
)
