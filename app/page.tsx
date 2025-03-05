import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import Link from "next/link";
import Lottie from "@/components/lottie";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import DashboardButton from "@/components/dashboard-button";

export default async function Home() {
  return (
    <div>
      <div className="min-h-screen bg-black text-white antialiased">
        {/* Header */}
        <header className="py-6 px-4 md:px-12 flex justify-between items-center border-b border-gray-800">
          <h1 className="text-2xl font-bold">NoxisFlow</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="#features">
                  <span className="hover:text-indigo-400">Caratteristiche</span>
                </Link>
              </li>
              <li>
                <Link href="#integration">
                  <span className="hover:text-indigo-400">Integrazioni</span>
                </Link>
              </li>
              <li>
                <Link href="#analytics">
                  <span className="hover:text-indigo-400">Analisi</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard">
                  <span className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded transition">
                    Dashboard
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-12 py-32">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Potenzia le tue campagne di email marketing
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              NoxisFlow è la soluzione completa per aziende e professionisti.
              Organizza, automatizza e analizza le tue campagne per massimizzare
              risultati e conversioni.
            </p>
            <DashboardButton />
          </div>
          <div className="mt-10 md:mt-0">
            <div className="w-80 md:w-96">
              <Lottie src="https://lottie.host/d1ea32ce-842b-4e6b-a1da-a6e7e1dd0333/x8i8tBxyOl.lottie" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="px-4 md:px-12 py-16 border-t border-gray-800"
        >
          <h3 className="text-3xl font-bold mb-10 text-center">
            Caratteristiche principali
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-2">
                Segmentazione Avanzata
              </h4>
              <p className="text-gray-400">
                Organizza i tuoi contatti con sistemi avanzati per una
                comunicazione mirata e personalizzata.
              </p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-2">
                Template Personalizzati
              </h4>
              <p className="text-gray-400">
                Crea e personalizza template senza scrivere una riga di codice
                grazie al nostro builder integrato.
              </p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-2">Automazione & API</h4>
              <p className="text-gray-400">
                Integra facilmente CRM, e-commerce e altre piattaforme per un
                flusso di lavoro ottimizzato.
              </p>
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section id="integration" className="px-4 md:px-12 py-16 bg-gray-800">
          <h3 className="text-3xl font-bold mb-10 text-center">
            Integrazioni senza limiti
          </h3>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-300 mb-4">
              Grazie alle sue potenti API, NoxisFlow si integra facilmente con
              CRM, e-commerce e molte altre piattaforme, rendendo la gestione
              delle campagne un&apos;esperienza fluida e senza interruzioni.
            </p>
            <p className="text-lg text-gray-300">
              Collega tutti i tuoi strumenti preferiti e crea un ecosistema
              digitale in cui ogni componente lavora in sinergia per
              massimizzare i risultati.
            </p>
          </div>
        </section>

        {/* Analytics Section */}
        <section
          id="analytics"
          className="px-4 md:px-12 py-16 border-t border-gray-800"
        >
          <h3 className="text-3xl font-bold mb-10 text-center">
            Analisi e Reportistica
          </h3>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-300 mb-4">
              Il nostro sistema di analisi avanzato fornisce dati dettagliati
              sulle performance delle campagne, permettendoti di monitorare
              aperture, click e conversioni in tempo reale.
            </p>
            <p className="text-lg text-gray-300">
              Utilizza i report per ottimizzare le tue strategie di marketing e
              ottenere sempre il massimo rendimento.
            </p>
          </div>
        </section>

        {/* Call To Action */}
        <section className="px-4 md:px-12 py-16 bg-gray-900 text-center">
          <h3 className="text-3xl font-bold mb-6">
            Sei pronto a rivoluzionare il tuo email marketing?
          </h3>
          <Link href="/dashboard">
            <span className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded transition">
              Accedi alla Dashboard
            </span>
          </Link>
        </section>

        {/* Footer */}
        <footer className="px-4 md:px-12 py-6 border-t border-gray-800 text-center text-gray-500">
          <p>
            © {new Date().getFullYear()} NoxisFlow. Tutti i diritti riservati.
          </p>
        </footer>
      </div>
    </div>
  );
}
