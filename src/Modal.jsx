import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'

export default function Modal({ show, setShow }) {
  return (
    <Dialog open={show} onClose={setShow} transition className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-300 ease-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all duration-300 ease-out data-[closed]:translate-y-4 data-[closed]:opacity-0 sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" className="text-lg leading-6 font-semibold text-white">
                    About
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-white mb-4">
                      While researching <a href="https://twitter.com/chris_whong/status/1402717960393957390?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1402717960393957390%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fwww.redditmedia.com%2Fmediaembed%2Fnwyxwt%3Fresponsive%3Dtrueis_nightmode%3Dtrue" target="_blank" rel="noreferrer" className="cursor-pointer underline text-blue-600 hover:text-blue-800 visited:text-purple-600">some mysterious manhole covers</a> on a recent walk, I found the treasure trove that is the New York Historical Society's <a href="https://digitalcollections.nyhistory.org/islandora/object/nyhs%3Asubway" target="_blank" rel="noreferrer" className="cursor-pointer underline text-blue-600 hover:text-blue-800 visited:text-purple-600">"Subway construction photograph collection, 1900-1950"</a>.  After perusing the photos online, I noticed several that seemed to be aligned in an organized sequence.  I was able to assemble a continuous segment from Grand Army Plaza to present-day Barclays Center, and put together a streetview-style interface allowing the user to virtually stroll down Flatbush Avenue and see how it looked in 1914.
                    </p>
                    <p className="text-sm text-white mb-4">
                      While each image on NYHS' website has geographic coordinates, most of the geometries are for a nearby intersection.  The geometries shown in this app were manually placed in by eyeballing the approximate location of each photo and using the survey marker references included in each photo.
                    </p>
                    <p className="text-sm text-white mb-4">
                      If you like this app, the coolest thing you can do is tweet at me (@chris_whong) and let me know what you learned or found or discovered in these amazing photos.  Happy Strolling!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-white shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setShow(false)}
              >
                Neat
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
