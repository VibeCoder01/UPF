import { ArrowLeft, CheckCircle, AlertTriangle, Info } from "lucide-react";
import Link from "next/link";

export default function AboutNovaPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 p-6 lg:p-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Analyzer
                </Link>

                <h1 className="text-4xl font-black tracking-tight mb-6">The NOVA Classification System</h1>

                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8">
                        The NOVA classification system groups foods according to the extent and purpose of industrial processing they undergo. It was developed by researchers at the University of São Paulo, Brazil, and is now recognized by international health organizations.
                    </p>

                    <div className="space-y-12">
                        {/* Group 1 */}
                        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">1</div>
                                <h2 className="text-2xl font-bold m-0">Unprocessed or Minimally Processed Foods</h2>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                                Edible parts of plants (seeds, fruits, leaves, stems, roots) or of animals (muscle, offal, eggs, milk), and also fungi, algae and water, after separation from nature. Minimally processed foods are natural foods altered by processes that include removal of inedible or unwanted parts, drying, crushing, grinding, fractioning, filtering, roasting, boiling, non-alcoholic fermentation, pasteurization, refrigeration, chilling, freezing, placing in containers and vacuum-packaging.
                            </p>
                            <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-100 dark:border-green-900/20">
                                <h3 className="text-sm font-bold text-green-800 dark:text-green-300 uppercase tracking-wider mb-2">Examples</h3>
                                <p className="text-sm text-green-700 dark:text-green-400">
                                    Fresh fruit, vegetables, grains, legumes, meat, fish, milk, eggs, plain yogurt, nuts, seeds, tea, coffee, water.
                                </p>
                            </div>
                        </section>

                        {/* Group 2 */}
                        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold">2</div>
                                <h2 className="text-2xl font-bold m-0">Processed Culinary Ingredients</h2>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                                Substances derived from Group 1 foods or from nature by processes that include pressing, refining, grinding, milling and drying. The purpose of processing here is to make durable products that are suitable for use in home and restaurant kitchens to prepare, season and cook Group 1 foods and to make with them varied and enjoyable hand-made dishes and meals, such as stews, soups and broths, salads, breads, preserves, drinks and desserts.
                            </p>
                            <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-xl border border-yellow-100 dark:border-yellow-900/20">
                                <h3 className="text-sm font-bold text-yellow-800 dark:text-yellow-300 uppercase tracking-wider mb-2">Examples</h3>
                                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                                    Salt, sugar, honey, vegetable oils, butter, lard, vinegar.
                                </p>
                            </div>
                        </section>

                        {/* Group 3 */}
                        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">3</div>
                                <h2 className="text-2xl font-bold m-0">Processed Foods</h2>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                                Products made essentially by adding salt, oil, sugar or other substances from Group 2 to Group 1 foods. Most processed foods have two or three ingredients, and are recognizable as modified versions of Group 1 foods. They are edible by themselves or, more usually, in combination with other foods.
                            </p>
                            <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-100 dark:border-orange-900/20">
                                <h3 className="text-sm font-bold text-orange-800 dark:text-orange-300 uppercase tracking-wider mb-2">Examples</h3>
                                <p className="text-sm text-orange-700 dark:text-orange-400">
                                    Canned vegetables, canned fish, fruits in syrup, cheeses, freshly made breads.
                                </p>
                            </div>
                        </section>

                        {/* Group 4 */}
                        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm ring-2 ring-red-500/10 dark:ring-red-500/20">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">4</div>
                                <h2 className="text-2xl font-bold m-0 text-red-600 dark:text-red-400">Ultra-Processed Foods (UPF)</h2>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                                Formulations of ingredients, mostly of exclusive industrial use, typically created by series of industrial techniques and processes (hence 'ultra-processed'). Some of these processes include the fractioning of whole foods into substances, chemical modifications of these substances, and the assembly of unmodified and modified food substances with little or no whole food using industrial techniques such as extrusion, moulding and pre-frying. Colors, flavors, emulsifiers and other additives are frequently added to make the final product palatable or hyper-palatable.
                            </p>
                            <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/20">
                                <h3 className="text-sm font-bold text-red-800 dark:text-red-300 uppercase tracking-wider mb-2">Examples</h3>
                                <p className="text-sm text-red-700 dark:text-red-400">
                                    Soft drinks, sweet or savory packaged snacks, reconstituted meat products, pre-prepared frozen dishes, instant noodles and soups.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
