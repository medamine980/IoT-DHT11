import { useCallback, useEffect, useState, FormEvent, useContext } from "react";
import { fetchLastIncident, resolveIncident } from "../Services/incidentService";
import { toast } from "react-toastify";
import Loading from "../shared/Loading/Loading";
import { checkLogin } from "../Services/usersService";
import UserContext from "../context/user-context";
import LoginModal from "../shared/LoginModal/LoginModal";

export default function IncidentManagement() {

    const { user } = useContext(UserContext);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [lastIncident, setLastIncident] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');

    const _fetchLastIncident = useCallback(() => {
        setLoading(true);
        fetchLastIncident().then((lastIncident: any) => {
            setLastIncident(lastIncident);
        }).catch((err) => {
            toast(err.message, { type: 'error' })
        }).finally(() => setLoading(false));
    }, []);

    function getDifference(prevDate: number) {
        let dateNow = Date.now()
        let diffInMs = (dateNow - prevDate);
        const units = [
            { unit: 'year', ms: 1000 * 60 * 60 * 24 * 365 },
            { unit: 'month', ms: 1000 * 60 * 60 * 24 * 30 },
            { unit: 'week', ms: 1000 * 60 * 60 * 24 * 7 },
            { unit: 'day', ms: 1000 * 60 * 60 * 24 },
            { unit: 'hour', ms: 1000 * 60 * 60 },
            { unit: 'minute', ms: 1000 * 60 },
            { unit: 'second', ms: 1000 },
        ]
        for (let { unit, ms } of units) {
            const diff = Math.floor(diffInMs / ms);
            if (diff > 1) {
                return new Intl.RelativeTimeFormat('FR-fr',
                    { numeric: 'auto' }).format(
                        -diff,
                        unit as Intl.RelativeTimeFormatUnit)
            }
        }
        return 'Maintenant';
    }


    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        resolveIncident(lastIncident.id, comment).then(() => {
            toast("L'incident a été résolu", { type: 'success' });
            setLastIncident(null);
        });
    }

    useEffect(() => {
        checkLogin().then(() => {
            setIsLoggedIn(true);
            _fetchLastIncident();
        }).catch(() => { setIsLoggedIn(false); setLoading(false) });
    }, [user]);

    if (loading) return <Loading />

    return (
        isLoggedIn ?
            <div className="container p-4">

                {lastIncident ?
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '.5em',
                        padding: '2em'
                    }}>
                        <h2>Incident</h2>
                        <div>
                            <p>Temperature {lastIncident.temp}C°</p>
                            <p>Humidité {lastIncident.temp}%</p>
                            <p>{getDifference(new Date(lastIncident.dt).getTime())}</p>
                            <form onSubmit={handleSubmit}>
                                <textarea value={comment}
                                    onChange={e => setComment(e.currentTarget.value)}
                                    className="form-control" placeholder="Type your comment...">
                                </textarea>
                                <button className="mt-2 btn btn-success" type="submit">Acquitter</button>
                            </form>
                        </div>
                    </div>
                    :
                    <div style={{
                        backgroundColor: '#94f994',
                        color: 'green',
                        border: "green 1px solid",
                        padding: '1em',
                        textAlign: 'center'
                    }}>Il n'y a pas d'Incident!</div>
                }

            </div>
            :
            <LoginModal />
    );
}
