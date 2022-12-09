import '@/assets/styles/paggination.scss';

interface IPaggination {
    "currentPage": number
    "maxPages": number
    "prevPage": () => void
    "nextPage": () => void
    "setCurrentPage": (current: number) => void
}

function Paggination({ currentPage, prevPage, nextPage, setCurrentPage, maxPages }: IPaggination) {
    const style = (p: number) => `paggination__item ${(p == currentPage) ? 'active' : null}`;

    return (
    <div className="paggination"> 
        <p className="paggination__title">Страницы</p>
        <p className="paggination__prev" onClick={prevPage}> ← </p>
        { Array(maxPages).fill(true).map((_, i) => <div key={i + 1} className={style(i + 1)} onClick={() => setCurrentPage(i + 1)} > { i + 1 } </div> )}
        <p className="paggination__next" onClick={nextPage}> → </p>
    </div>
    )
}

export default Paggination;