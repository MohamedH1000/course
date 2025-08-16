# 🎨 Loading Components Documentation

This project includes a comprehensive set of beautiful, smooth loading components with stunning animations and transitions. All components support RTL (Arabic) layout and are fully integrated with the theme system.

## 🚀 Quick Start

### 1. Basic Usage

```tsx
import { Loading, PageLoading, OverlayLoading } from "@/components/ui/loading"

// Simple spinner
<Loading variant="default" text="Loading..." />

// Full page loading
<PageLoading text="Loading your dashboard..." />

// Overlay loading
<OverlayLoading text="Processing..." />
```

### 2. Using the Loading Context

```tsx
import { useLoading } from "@/contexts/loading-context"

function MyComponent() {
  const { showLoading, hideLoading, withLoading } = useLoading()

  // Method 1: Automatic loading with promise
  const handleSubmit = async () => {
    await withLoading(
      fetch('/api/data').then(res => res.json()),
      "Saving your changes..."
    )
  }

  // Method 2: Manual control
  const handleManualLoading = async () => {
    showLoading("Custom message...")
    // Do async work
    await someAsyncOperation()
    hideLoading()
  }

  return (
    <button onClick={handleSubmit}>
      Save Changes
    </button>
  )
}
```

## 📚 Component Reference

### Core Loading Components

#### `<Loading />`
The main loading component with multiple variants.

**Props:**
- `variant`: `"default" | "page" | "overlay" | "minimal" | "dots" | "pulse"`
- `size`: `"sm" | "md" | "lg" | "xl"`
- `text`: Optional loading text
- `className`: Additional CSS classes

**Examples:**
```tsx
<Loading variant="default" size="md" text="Loading..." />
<Loading variant="minimal" size="lg" />
<Loading variant="dots" text="Please wait..." />
<Loading variant="pulse" size="xl" text="Processing..." />
```

#### `<PageLoading />`
Full-page loading screen with animated logo and progress bar.

```tsx
<PageLoading text="Loading your learning dashboard..." />
```

#### `<OverlayLoading />`
Modal overlay loading that appears on top of content.

```tsx
<OverlayLoading text="Saving your progress..." />
```

#### `<MinimalLoading />`
Simple spinner without text.

```tsx
<MinimalLoading size="md" className="text-primary" />
```

### Skeleton Components

#### `<SkeletonLine />`
Animated placeholder for text lines.

```tsx
<SkeletonLine className="h-4 w-full" />
<SkeletonLine className="h-4 w-3/4" />
<SkeletonLine className="h-4 w-1/2" />
```

#### `<SkeletonCard />`
Placeholder for card content.

```tsx
<SkeletonCard className="w-full" />
```

#### `<SkeletonAvatar />`
Placeholder for user avatars.

```tsx
<SkeletonAvatar size="md" />
```

### Course-Specific Loading Components

#### `<CourseCardLoading />`
Loading state for course cards.

```tsx
<CourseCardLoading />
```

#### `<CourseGridLoading />`
Loading state for course grid layout.

```tsx
<CourseGridLoading count={6} />
```

#### `<CourseListLoading />`
Loading state for course list layout.

```tsx
<CourseListLoading count={5} />
```

#### `<DashboardStatsLoading />`
Loading state for dashboard statistics cards.

```tsx
<DashboardStatsLoading />
```

#### `<LessonLoading />`
Loading state for lesson content.

```tsx
<LessonLoading />
```

#### `<ProfileLoading />`
Loading state for user profile pages.

```tsx
<ProfileLoading />
```

### Page Transition Components

#### `<PageTransition />`
Smooth transitions between pages.

```tsx
<PageTransition>
  <YourPageContent />
</PageTransition>
```

#### `<RouteLoading />`
Loading state for route changes.

```tsx
<RouteLoading />
```

#### `<SuspenseFallback />`
Fallback component for React Suspense.

```tsx
<Suspense fallback={<SuspenseFallback />}>
  <LazyComponent />
</Suspense>
```

## 🎯 Usage Patterns

### 1. Dashboard Loading States

```tsx
function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    loadDashboardData().then(data => {
      setData(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <DashboardStatsLoading />
        <CourseGridLoading count={6} />
      </div>
    )
  }

  return <DashboardContent data={data} />
}
```

### 2. Form Submission Loading

```tsx
function CourseForm() {
  const { withLoading } = useLoading()
  const [formData, setFormData] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    await withLoading(
      saveCourse(formData),
      "Saving your course..."
    )
    
    // Success handling
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button type="submit">Save Course</Button>
    </form>
  )
}
```

### 3. Data Fetching with Skeleton

```tsx
function CourseList() {
  const [courses, setCourses] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses().then(data => {
      setCourses(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading ? (
        <CourseGridLoading count={6} />
      ) : (
        courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))
      )}
    </div>
  )
}
```

### 4. Page-Level Loading

```tsx
function CoursePage({ params }) {
  const [course, setCourse] = useState(null)

  useEffect(() => {
    // Show page loading while fetching
    fetchCourse(params.id).then(setCourse)
  }, [params.id])

  if (!course) {
    return <PageLoading text="Loading course content..." />
  }

  return <CourseContent course={course} />
}
```

## 🎨 Customization

### Custom Animations

Add custom animations to your CSS:

```css
@keyframes custom-spin {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}

.animate-custom-spin {
  animation: custom-spin 2s ease-in-out infinite;
}
```

### Theme Integration

All loading components automatically adapt to your theme:

```tsx
// Components automatically use theme colors
<Loading variant="default" /> // Uses --primary color
<SkeletonLine />              // Uses --muted color
<PageLoading />               // Uses theme gradient
```

### RTL Support

All components automatically support RTL layout:

```tsx
// Automatically adjusts for Arabic/RTL languages
<CourseListLoading />  // Icons and layout flip for RTL
<DashboardStatsLoading /> // Proper RTL spacing
```

## 🚀 Performance Tips

1. **Use Skeleton Loading**: Prefer skeleton components over spinners for better UX
2. **Lazy Load Components**: Use React.lazy() with SuspenseFallback
3. **Debounce Loading States**: Avoid flickering with short loading times
4. **Preload Critical Resources**: Show loading while preloading important assets

## 🎯 Best Practices

1. **Consistent Loading States**: Use the same loading pattern throughout your app
2. **Meaningful Messages**: Provide context-specific loading messages
3. **Progressive Loading**: Show partial content while loading additional data
4. **Accessibility**: All components include proper ARIA labels
5. **Performance**: Loading components are optimized for smooth animations

## 📱 Responsive Design

All loading components are fully responsive:

- **Mobile**: Optimized touch targets and spacing
- **Tablet**: Proper scaling for medium screens  
- **Desktop**: Full feature set with hover states
- **RTL**: Complete right-to-left language support

## 🔧 Integration Examples

### With React Query

```tsx
function CourseList() {
  const { data: courses, isLoading } = useQuery('courses', fetchCourses)

  if (isLoading) {
    return <CourseGridLoading count={6} />
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
```

### With SWR

```tsx
function Dashboard() {
  const { data, error, isLoading } = useSWR('/api/dashboard', fetcher)

  if (isLoading) return <DashboardStatsLoading />
  if (error) return <ErrorState />

  return <DashboardContent data={data} />
}
```

### With Next.js App Router

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <PageLoading text="Loading dashboard..." />
}

// app/courses/loading.tsx  
export default function Loading() {
  return <CourseGridLoading count={8} />
}
```

This comprehensive loading system provides a consistent, beautiful, and performant user experience across your entire course platform! 🎉