import { useState } from 'react'
import type { SearchMode, WordApiResponse } from './types'
import { searchWord, checkStartsWith, getWordsWithPrefix } from './api'
import './App.css'

const modes: { value: SearchMode; label: string }[] = [
	{ value: 'search', label: 'Exact Search' },
	{ value: 'starts-with', label: 'Starts With' },
	{ value: 'prefix', label: 'Prefix Search' },
]

function getPlaceholder(mode: SearchMode): string {
	if (mode === 'search') return 'Enter a word...'
	return 'Enter a prefix...'
}

const App = () => {
	const [mode, setMode] = useState<SearchMode>('search')
	const [input, setInput] = useState('')
	const [result, setResult] = useState<WordApiResponse | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const trimmed = input.trim()
		if (!trimmed) return

		setLoading(true)
		setError(null)
		setResult(null)

		try {
			let data: WordApiResponse
			if (mode === 'search') {
				data = await searchWord(trimmed)
			} else if (mode === 'starts-with') {
				data = await checkStartsWith(trimmed)
			} else {
				data = await getWordsWithPrefix(trimmed)
			}
			setResult(data)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An unexpected error occurred')
		} finally {
			setLoading(false)
		}
	}

	const handleModeChange = (newMode: SearchMode) => {
		setMode(newMode)
		setResult(null)
		setError(null)
	}

	return (
		<div className="app">
			<header className="header">
				<h1>Seshat</h1>
				<p className="subtitle">Word Search</p>
			</header>

			<main className="main">
				<div className="mode-selector">
					{modes.map((m) => (
						<label key={m.value} className={`mode-option${mode === m.value ? ' active' : ''}`}>
							<input
								type="radio"
								name="mode"
								value={m.value}
								checked={mode === m.value}
								onChange={() => handleModeChange(m.value)}
							/>
							{m.label}
						</label>
					))}
				</div>

				<form className="search-form" onSubmit={handleSubmit}>
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder={getPlaceholder(mode)}
						disabled={loading}
					/>
					<button type="submit" disabled={loading || !input.trim()}>
						{loading ? 'Searching...' : 'Search'}
					</button>
				</form>

				{error && <div className="error">{error}</div>}

				{result && <ResultDisplay result={result} />}
			</main>
		</div>
	)
}

function ResultDisplay({ result }: { result: WordApiResponse }) {
	if ('found' in result) {
		return (
			<div className={`result ${result.found ? 'result-found' : 'result-not-found'}`}>
				<span className="result-icon">{result.found ? '\u2713' : '\u2717'}</span>
				<span>
					<strong>{result.word}</strong> {result.found ? 'was found in the dictionary' : 'was not found'}
				</span>
			</div>
		)
	}

	if ('matches' in result) {
		return (
			<div className={`result ${result.matches ? 'result-found' : 'result-not-found'}`}>
				<span className="result-icon">{result.matches ? '\u2713' : '\u2717'}</span>
				<span>
					{result.matches
						? <>Words starting with "<strong>{result.prefix}</strong>" exist</>
						: <>No words start with "<strong>{result.prefix}</strong>"</>}
				</span>
			</div>
		)
	}

	if ('words' in result) {
		return (
			<div className="result result-list">
				<p>
					<strong>{result.words.length}</strong> word{result.words.length !== 1 ? 's' : ''} found
					with prefix "<strong>{result.prefix}</strong>"
				</p>
				{result.words.length > 0 && (
					<ul className="word-list">
						{result.words.map((w) => (
							<li key={w}>{w}</li>
						))}
					</ul>
				)}
			</div>
		)
	}

	return null
}

export default App
