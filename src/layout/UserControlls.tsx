import { useEffect, useState } from 'react';
import i18n from '../I18N';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import counteriesCodes from '../data/counteries';
import { useCounteryContext } from '../Contexts/CounteryContext';

function UserControlls() {
  const { t } = useTranslation();

  return (
    <header className=" bg-secondary text-white py-3">
      <div className="my-container flex justify-between items-center">
        <div className="lang-count flex gap-4">
          <LangSelector />
          <CounterySelector />
        </div>
        <div className="auth flex gap-4">
          <UserLink text={t('login')} link="#" />
          <UserLink text={t('register')} style={'bgc'} link="#" />
        </div>
      </div>
    </header>
  );
}

type UserLinkProps = {
  text: string;
  style?: string | null;
  link: string;
};

function UserLink({ text, style = null, link }: UserLinkProps) {
  return (
    <a
      href={link}
      className={` outline-none rounded-md text-lg font-bold px-4 py-2 hover:bg-primary transition-colors duration-300 ${
        style && 'bg-white text-black hover:text-white'
      } ${style == null && 'text-primary'}`}
    >
      {text}
    </a>
  );
}

function LangSelector() {
  const [isLangOpen, setIsLangOpen] = useState(false);

  const toggleLang = () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    if (newLanguage === 'ar') document.documentElement.dir = 'rtl';
    else document.documentElement.dir = 'ltr';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div
      onMouseEnter={() => setIsLangOpen(true)}
      onMouseLeave={() => setIsLangOpen(false)}
      className="lang relative"
    >
      <button className="flex gap-1">
        {i18n.language === 'en' ? 'English' : 'عربي'}
        {isLangOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      <AnimatePresence>
        {isLangOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 5 }}
            exit={{ opacity: 0, y: -10 }}
            className="drop-down"
          >
            <li>
              <button onClick={toggleLang}>عربي</button>
            </li>
            <li>
              <button onClick={toggleLang}>English</button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function CounterySelector() {
  const [isCounteryOpen, setIsCounteryOpen] = useState(false);
  const [counteries, setCounteries] = useState([]);
  const { currCountery, setCurrCountery } = useCounteryContext();

  type counteryType = {
    id: number;
    name: string;
    nameArabic: string;
  };

  useEffect(() => {
    fetch('http://mohagado-001-site1.itempurl.com/Country')
      .then((res) => res.json())
      .then((data) => setCounteries(data));
  }, []);

  return (
    <div
      onMouseEnter={() => setIsCounteryOpen(true)}
      onMouseLeave={() => setIsCounteryOpen(false)}
      className="lang relative"
    >
      <button className="flex items-center gap-2 ">
        {currCountery.country_name
          ? currCountery.country_name
          : currCountery.name}
        <div
          className={`fi fi-${
            counteriesCodes[
              currCountery.country_name
                ? currCountery.country_name
                : currCountery.name
            ]
          }
          } fis`}
        ></div>
        {isCounteryOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      <AnimatePresence>
        {isCounteryOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 5 }}
            exit={{ opacity: 0, y: -10 }}
            className="drop-down"
          >
            {counteries.map((countery: counteryType) => (
              <li key={`counter-${countery.id}`}>
                <button
                  onClick={() => setCurrCountery(countery)}
                  className=" flex items-center justify-between text-nowrap gap-1"
                >
                  {i18n.language === 'en' ? countery.name : countery.nameArabic}
                  <div
                    className={`fi fi-${counteriesCodes[countery.name]} fis`}
                  ></div>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserControlls;
