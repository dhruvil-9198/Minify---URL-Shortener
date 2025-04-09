import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import './App.css';
import Navbar from './components/Navbar'

const Home = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      const fetchdata = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: user.username,
            email: user.emailAddresses[0].emailAddress,
            password: user.id,
          }),
        });

        const data = await response.json();
      }
      fetchdata();
    }
  }, [isSignedIn])

  const handleShorten = async (e) => {
    e.preventDefault();
    setShortUrl("");
    setError("");


    if (!url.startsWith("https://")) {
      setError("Please enter a valid URL.(Like https://example.com)");
      return;
    }

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch(`${import.meta.env.VITE_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user.username,
          url: url,
        }),
      });

      const data = await response.json();

      setShortUrl(`${import.meta.env.VITE_API_URL}/${data.short_id}`);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-grow px-4 py-12">
        <SignedOut>
          <motion.div className='flex flex-col gap-8 items-center text-center' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className='font-bold text-6xl text-indigo-800 drop-shadow-lg'>Welcome to Minify</h2>
            <p className='text-2xl text-indigo-600'>Sign in to create your own short links instantly!</p>
            <SignInButton>
              <button className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-8 py-4 text-xl font-semibold shadow-lg transition-transform hover:scale-105'>
                Sign In
              </button>
            </SignInButton>
          </motion.div>
        </SignedOut>

        <SignedIn>
          <motion.div
            className="bg-white rounded-3xl p-10 w-full max-w-lg text-center shadow-2xl space-y-8 border-t-4 border-indigo-400"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-extrabold text-indigo-800">Shorten Your Link</h2>

            <form onSubmit={handleShorten} className='space-y-5'>
              <input
                type="text"
                placeholder="Type or Paste your URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-200 shadow-md"
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-4 rounded-2xl font-bold shadow-lg transition-transform hover:scale-105"
                disabled={loading}
              >
                {loading ? "Shortening..." : "Shorten URL"}
              </button>
            </form>

            {shortUrl && (
              <motion.div
                className="p-6 bg-indigo-50 rounded-2xl flex flex-col gap-5 mt-8 shadow-inner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <p className="text-sm text-indigo-600 mb-2">Your short link:</p>
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-700 font-bold text-lg underline break-words"
                  >
                    {shortUrl}
                  </a>
                </div>
                <button
                  onClick={handleCopy}
                  className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-3 rounded-xl font-bold shadow-md transition-transform hover:scale-105"
                >
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </button>
              </motion.div>
            )}
          </motion.div>
        </SignedIn>
      </div>
    </div>
  );
}

export default Home;
