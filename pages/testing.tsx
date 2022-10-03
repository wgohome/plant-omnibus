import Layout from "../components/layout"
import Tabs from "../components/atomic/Tabs"

const Testing = () => {

  const graphs = [
    {
      label: "Barchart",
      header: (
        <div className="">Hello barchart</div>
      ),
      content: (
        <div className="bg-stone-300">
          This is the content lorem 1
        </div>
      ),
    },
    {
      label: "Boxplot",
      header: (
        <div className="">Hello boxplot</div>
      ),
      content: (
        <div className="bg-stone-300">
          This is the content lorem 2
        </div>
      ),
    },
    {
      label: "Boxplot 2",
      header: (
        <div className="">Hello boxplot 2</div>
      ),
      content: (
        <div className="bg-stone-300">
          This is the content lorem 3
        </div>
      ),
    },
  ]

  return (
    <Layout>
      <section>
        This is a test section
      </section>

      <section>
        <Tabs listItems={graphs} />


      </section>
    </Layout>
  )
}

export default Testing
