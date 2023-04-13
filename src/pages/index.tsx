import React, { useState, useEffect } from 'react';

type ThumbData = {
  comment: string;
  question: string;
  answer: string;
};

type Data = {
  thumb_up: ThumbData[];
  thumb_down: ThumbData[];
};

const IndexPage = () => {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<keyof Data>('thumb_up');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://script.googleusercontent.com/a/macros/torchbox.com/echo?user_content_key=FmSBdKc6uHlVe9RpUcFQCCVAaJg0U8HtRlj83iVJ3AF_ulWe5980FzACYKnNR_3gaTGP8_HSNe7-DYg--4Z52u6I0WD-Jej9OJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKAndpZgU0_di1nYWiQKWLPi68n4RAo2RJyKZKRx_v_ue0xtw882fJTWyJ-VnkxxitKmM1FIs04QHjNz5QScvU2UanUrXavFN83eHzbewZz5xHuPgi6BIvdz1n8waaRjt5Xc_ScPTHfLrg&lib=MKVQKwR-62stIpsbtMZ4yzLazxL27H8P-');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const switchSelection = (selection: keyof Data) => {
    setSelected(selection);
  };

  return (
    <div className="mx-auto max-w-2xl px-4">
      {isLoading ? (
        <div className="flex mt-16 items-center justify-center">
          <div className="w-6 h-6 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
          <span className="ml-2">Data is loading...</span>
        </div>
      ) : (
        <div>
          <div className="my-4">
            <div className="flex space-x-8 my-12">
              <div><h2 className='font-bold text-lg'>Helpful responses</h2>
                <p>{data?.thumb_up.length}</p></div>
              <div><h2 className='font-bold text-lg'>Helpful responses</h2>
                <p>{data?.thumb_down.length}</p></div>
            </div>
            <button
              className={`font-bold py-2 px-4 rounded mr-2 border-2 border-black ${selected === 'thumb_up'
                ? 'bg-white text-black'
                : 'bg-black text-white'
                }`}
              onClick={() => switchSelection('thumb_up')}
            >
              Helpful responses
            </button>
            <button
              className={`font-bold py-2 px-4 rounded border-2 border-black ${selected === 'thumb_down'
                ? 'bg-white text-black'
                : 'bg-black text-white'
                }`}
              onClick={() => switchSelection('thumb_down')}
            >
              Unhelpful responses
            </button>
          </div>
          <div className="prose">
            {data && data[selected].map((item, index) => (
              <div key={index}>

                <p>
                  <strong>Prompt:</strong> {item.question}
                  <br />
                  <strong>Response:</strong> {item.answer}
                  <br />
                  <small><strong>Comment:</strong> {item.comment}</small>
                </p>

              </div>
            ))}
          </div></div>
      )}
    </div>
  );
};

export default IndexPage;
